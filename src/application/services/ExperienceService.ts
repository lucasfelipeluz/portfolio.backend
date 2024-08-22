import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '@/application/dtos';
import { IExperienceService } from '@/application/interfaces';
import { ApplicationError } from '@/core/errors';
import { CreateStorageItem, ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { Experience } from '@/domain/entities';
import { initTransaction } from '@/infrastructure/config/dbConnection';
import { IExperienceRepository, IStorageProvider } from '@/infrastructure/interfaces';
import { StorageProvider } from '@/infrastructure/providers';
import { ExperienceRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { v4 as generateUuidV4 } from 'uuid';

@injectable()
class ExperienceService implements IExperienceService {
  private readonly experienceRepository: IExperienceRepository;
  private readonly storageProvider: IStorageProvider;

  constructor(experienceRepository: ExperienceRepository, storageProvider: StorageProvider) {
    this.experienceRepository = experienceRepository;
    this.storageProvider = storageProvider;
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
    const transaction = await initTransaction();
    try {
      const createStorageItem: CreateStorageItem = {
        base64: entity.getBase64(),
        filename: generateUuidV4(),
        folder: strings.experience,
      };

      const storageItem = await this.storageProvider.create(createStorageItem);

      const newEntityDomain = entity.toDomain(storageItem.key);

      const createdEntity = await this.experienceRepository.create(newEntityDomain, {
        transaction,
      });

      await transaction.commit();

      return new ExperienceDto(createdEntity);
    } catch (e) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
  }

  async update(
    entity: UpdateExperienceDto,
    filter: UpdateServiceOptions<ExperienceDto>,
  ): Promise<ExperienceDto> {
    const transaction = await initTransaction();
    try {
      const createStorageItem: CreateStorageItem = {
        base64: entity.getBase64(),
        filename: generateUuidV4(),
        folder: strings.experience,
      };

      const storageItem = await this.storageProvider.create(createStorageItem);

      const newEntity = entity.toDomain(storageItem.key);

      const options = transform.updateServiceFilterToModelUpdateFilter<ExperienceDto, Experience>(
        filter,
      );

      await this.experienceRepository.update(newEntity, { ...options, transaction });

      await transaction.commit();

      return new ExperienceDto(newEntity);
    } catch (e) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
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
