import { ServiceFilter } from '@/core/types';
import { transform } from '@/core/utils';
import { SystemVariable } from '@/domain/entities';
import { ISystemVariableRepository } from '@/infrastructure/interfaces';
import { SystemVariableRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { CreateSystemVariableDto, SystemVariableDto } from '../dtos';
import { ISystemVariableService } from '../interfaces';

@injectable()
class SystemVariableService implements ISystemVariableService {
  private readonly systemVariableRepository: ISystemVariableRepository;

  constructor(systemVariableRepository: SystemVariableRepository) {
    this.systemVariableRepository = systemVariableRepository;
  }

  async getAll(filter?: ServiceFilter<SystemVariableDto>): Promise<SystemVariableDto[]> {
    const options = transform.serviceFilterToModelFilter<SystemVariableDto, SystemVariable>(
      filter ?? ({} as ServiceFilter<SystemVariableDto>),
    );

    const entities = await this.systemVariableRepository.getAll(options);

    return entities.map((entity) => new SystemVariableDto(entity));
  }

  async get(key: string): Promise<SystemVariableDto | null> {
    const filter = {
      where: {
        key,
      },
      isActive: true,
    } as ServiceFilter<SystemVariableDto>;

    const options = transform.serviceFilterToModelFilter<SystemVariableDto, SystemVariable>(
      filter ?? ({} as ServiceFilter<SystemVariableDto>),
    );

    const entity = await this.systemVariableRepository.getOne(options);

    if (!entity) {
      return {} as SystemVariableDto;
    }

    return new SystemVariableDto(entity);
  }

  async createOrUpdate(entity: CreateSystemVariableDto): Promise<SystemVariableDto> {
    const filter = {
      where: {
        key: entity.key,
      },
    } as ServiceFilter<SystemVariableDto>;

    const findOptions = transform.serviceFilterToModelFilter<SystemVariableDto, SystemVariable>(
      filter ?? ({} as ServiceFilter<SystemVariableDto>),
    );

    const updateOptions = transform.updateServiceFilterToModelUpdateFilter<
      SystemVariableDto,
      SystemVariable
    >(filter ?? ({} as ServiceFilter<SystemVariableDto>));

    const existingEntity = await this.systemVariableRepository.getOne(findOptions);

    if (existingEntity) {
      await this.systemVariableRepository.update(
        {
          key: entity.key,
          value: entity.value,
          isActive: true,
        } as SystemVariable,
        updateOptions,
      );

      return new SystemVariableDto(entity.toDomain());
    }

    const newEntity = await this.systemVariableRepository.create(entity.toDomain());

    return new SystemVariableDto(newEntity);
  }

  delete(id: number): Promise<boolean> {
    const filter = {
      where: {
        id,
      },
    } as ServiceFilter<SystemVariableDto>;

    const options = transform.updateServiceFilterToModelUpdateFilter<
      SystemVariableDto,
      SystemVariable
    >(filter);

    const isDeleted = this.systemVariableRepository.delete(options);

    return isDeleted;
  }
}

export default SystemVariableService;
