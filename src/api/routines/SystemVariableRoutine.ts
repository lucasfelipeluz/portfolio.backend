import { SystemVariableDto } from '@/application/dtos';
import { ServiceFilter } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { ISystemVariableRepository } from '@/infrastructure/interfaces';
import { SystemVariableRepository } from '@/infrastructure/repositories';
import { ScheduleOptions } from 'node-cron';
import { autoInjectable, inject } from 'tsyringe';
import Routine from './Routine';

@autoInjectable()
class SystemVariableRoutine extends Routine {
  private readonly systemVariableRepository: ISystemVariableRepository;

  constructor(
    @inject(strings.systemVariableRoutine) cron: string,
    systemVariableRepository: SystemVariableRepository,
  ) {
    super(cron, strings.systemVariableRoutine);

    this.systemVariableRepository = systemVariableRepository;
  }

  public handle(): void {
    const callback = async (): Promise<void> => {
      const filters = {
        where: {},
      } as ServiceFilter<SystemVariableDto>;

      const options = transform.serviceFilterToModelFilter(filters);

      await this.systemVariableRepository.getAll(options);
    };

    const options: ScheduleOptions = {
      name: strings.systemVariableRoutine,
      runOnInit: true,
    };

    this.run(callback, options);
  }
}

export default SystemVariableRoutine;
