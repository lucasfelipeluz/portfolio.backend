import { NotImplementedError } from '@/core/errors';
import { ApplicationEntityCreatingOptions, ApplicationFilter } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { AcessMetrics } from '@/domain/entities';
import {
  IAcessMetricsRepository,
  IBaseRepository,
  ICacheProvider,
} from '@/infrastructure/interfaces';
import { AcessMetricsModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class AcessMetricsRepository implements IBaseRepository<AcessMetrics>, IAcessMetricsRepository {
  private readonly cacheProvider: ICacheProvider<AcessMetrics>;

  constructor(cacheRepository: CacheProvider<AcessMetrics>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: ApplicationFilter<AcessMetrics>): Promise<AcessMetrics[]> {
    const cache = await this.cacheProvider.get(strings.acessMetrics, options);

    if (cache) {
      return cache as AcessMetrics[];
    }

    const findOptions = transform.applicationFilterToFindOptions<AcessMetrics>(options);

    const result = await AcessMetricsModel.findAll({
      ...findOptions,
      include: relationships.acessMetrics,
    });

    if (result.length < 1) {
      return [] as AcessMetrics[];
    }

    await this.cacheProvider.create(strings.acessMetrics, options, result);

    return result as AcessMetrics[];
  }

  async getOne(options: ApplicationFilter<AcessMetrics>): Promise<AcessMetrics | null> {
    const cache = await this.cacheProvider.get(strings.acessMetrics, options);

    if (cache) {
      return cache as AcessMetrics;
    }

    const findOptions = transform.applicationFilterToFindOptions<AcessMetrics>(options);

    const result = await AcessMetricsModel.findOne({
      ...findOptions,
    });

    if (result) {
      await this.cacheProvider.create(strings.acessMetrics, options, result);
    }

    return result as AcessMetrics;
  }

  async create(
    entity: AcessMetrics,
    options: ApplicationEntityCreatingOptions,
  ): Promise<AcessMetrics> {
    const createOptions =
      transform.applicationCreatingOptionsToCreateOptions<AcessMetrics>(options);

    const result = await AcessMetricsModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.acessMetrics);

    return result as AcessMetrics;
  }

  async bulkCreate(
    entity: AcessMetrics[],
    options: ApplicationEntityCreatingOptions,
  ): Promise<AcessMetrics[]> {
    const createOptions =
      transform.applicationCreatingOptionsToCreateOptions<AcessMetrics>(options);

    const result = await AcessMetricsModel.bulkCreate(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.acessMetrics);

    return result as AcessMetrics[];
  }

  async update(): Promise<boolean> {
    throw new NotImplementedError(strings.notImplementedError);
  }

  async delete(): Promise<boolean> {
    throw new NotImplementedError(strings.notImplementedError);
  }
}

export default AcessMetricsRepository;
