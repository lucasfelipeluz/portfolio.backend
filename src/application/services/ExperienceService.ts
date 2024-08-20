import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '@/application/dtos';
import { IExperienceService } from '@/application/interfaces';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { transform } from '@/core/utils';
import { Experience } from '@/domain/entities';
import { IExperienceRepository } from '@/infrastructure/interfaces';
import { ExperienceRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';

@injectable()
class ExperienceService implements IExperienceService {
  private readonly experienceRepository: IExperienceRepository;

  constructor(experienceRepository: ExperienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  async getAll(filter: ServiceFilter<ExperienceDto>): Promise<ExperienceDto[]> {
    const options = transform.serviceFilterToModelFilter<ExperienceDto, Experience>(
      filter ?? ({} as ServiceFilter<Experience>),
    );

    const entities = await this.experienceRepository.getAll(options);

    return entities.map((entity) => new ExperienceDto(entity));
  }

  async getOne(filter: ServiceFilter<ExperienceDto>): Promise<ExperienceDto | null> {
    const options = transform.serviceFilterToModelFilter<ExperienceDto, Experience>(
      filter ?? ({} as ServiceFilter<Experience>),
    );

    const entity = await this.experienceRepository.getOne(options);

    if (!entity) {
      return {} as ExperienceDto;
    }

    return new ExperienceDto(entity);
  }

  async getById(id: number): Promise<ExperienceDto | null> {
    const entity = await this.experienceRepository.getById(id);

    if (!entity) {
      return {} as ExperienceDto;
    }

    return new ExperienceDto(entity);
  }

  async create(entity: CreateExperienceDto): Promise<ExperienceDto> {
    const newEntityDomain = entity.toDomain('');

    const createdEntity = await this.experienceRepository.create(newEntityDomain);

    return new ExperienceDto(createdEntity);
  }

  async update(
    entity: UpdateExperienceDto,
    filter: UpdateServiceOptions<ExperienceDto>,
  ): Promise<ExperienceDto> {
    const newEntity = entity.toDomain('');

    const options = transform.updateServiceFilterToModelUpdateFilter<ExperienceDto, Experience>(
      filter,
    );

    await this.experienceRepository.update(newEntity, options);

    return new ExperienceDto(newEntity);
  }

  async delete(id: number): Promise<boolean> {
    const filter: ServiceFilter<ExperienceDto> = {
      where: {
        id: id,
      },
    };

    const options = transform.updateServiceFilterToModelUpdateFilter<ExperienceDto, Experience>(
      filter,
    );

    const isDeleted = await this.experienceRepository.delete(options);

    return isDeleted;
  }
}

export default ExperienceService;
