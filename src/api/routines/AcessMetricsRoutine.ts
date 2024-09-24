import { ClientSourceCount } from '@/core/types';
import { strings } from '@/core/utils';
import { AcessMetrics } from '@/domain/entities';
import { IAcessMetricsRepository, ICacheProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider, CacheProvider } from '@/infrastructure/providers';
import { AcessMetricsRepository } from '@/infrastructure/repositories';
import { ScheduleOptions } from 'node-cron';
import { autoInjectable, inject } from 'tsyringe';
import Routine from './Routine';

@autoInjectable()
class AcessMetricsRoutine extends Routine {
  private readonly acessMetricsRepository: IAcessMetricsRepository;
  private readonly cacheRepository: ICacheProvider<ClientSourceCount>;

  constructor(
    @inject(strings.acessMetricsRoutine) cron: string,
    acessMetricsRepository: AcessMetricsRepository,
    @inject(strings.applicationConfigProvider) applicationConfigProvider: ApplicationConfigProvider,
    cacheRepository: CacheProvider<ClientSourceCount>,
  ) {
    super(cron, strings.acessMetricsRoutine, applicationConfigProvider);

    this.acessMetricsRepository = acessMetricsRepository;
    this.cacheRepository = cacheRepository;
  }

  public handle(): void {
    const callback = async (): Promise<void> => {
      const clientSources = await this.cacheRepository.get(strings.clientSource, {});

      if (!clientSources) {
        return;
      }

      const data = Array.isArray(clientSources)
        ? clientSources.map((cs) => {
            return {
              route: cs.route,
              date: new Date(cs.timestamp),
              idUser: cs.idUser,
            } as AcessMetrics;
          })
        : [];

      await this.acessMetricsRepository.bulkCreate(data);

      await this.cacheRepository.clearWhenStartingWithThese([
        strings.acessMetrics,
        strings.clientSource,
      ]);
    };

    const options: ScheduleOptions = {
      name: strings.acessMetricsRoutine,
      runOnInit: false,
    };

    this.run(callback, options);
  }
}

export default AcessMetricsRoutine;
