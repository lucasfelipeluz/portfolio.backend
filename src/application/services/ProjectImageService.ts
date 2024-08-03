import { CreateProjectImageDto, ProjectImageDto } from '@/application/dtos';
import { IProjectImageService } from '@/application/interfaces';
import { CreateStorageItem, ServiceFilter } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { ProjectImage } from '@/domain/entities';
import { IProjectImageRepository, IStorageProvider } from '@/infrastructure/interfaces';
import { StorageProvider } from '@/infrastructure/providers';
import { ProjectImageRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { v4 as generateUuidV4 } from 'uuid';

@injectable()
class ProjectImageService implements IProjectImageService {
  private readonly projectImageRepository: IProjectImageRepository;
  private readonly storageProvider: IStorageProvider;

  constructor(projectImageRepository: ProjectImageRepository, storageProvider: StorageProvider) {
    this.projectImageRepository = projectImageRepository;
    this.storageProvider = storageProvider;
  }

  async create(entity: CreateProjectImageDto): Promise<ProjectImageDto> {
    const createStorageItem: CreateStorageItem = {
      base64: entity.getBase64(),
      filename: generateUuidV4(),
      folder: strings.projects,
    };

    const storageItem = await this.storageProvider.create(createStorageItem);

    const newEntity = entity.toDomain(storageItem.key);

    const createdEntity = await this.projectImageRepository.create(newEntity);

    return new ProjectImageDto(createdEntity);
  }

  async updateViewPriority(id: number, viewPriority: number): Promise<ProjectImageDto> {
    const filters: ServiceFilter<ProjectImageDto> = {
      where: {
        id,
      },
    };

    const options = transform.updateServiceFilterToModelUpdateFilter<ProjectImageDto, ProjectImage>(
      filters,
    );

    const entityToUpdate = {
      viewPriority,
    } as ProjectImage;

    await this.projectImageRepository.update(entityToUpdate, options);

    return new ProjectImageDto(entityToUpdate);
  }

  async delete(id: number): Promise<boolean> {
    const filter: ServiceFilter<ProjectImageDto> = {
      where: {
        id: id,
      },
    };

    const options = transform.updateServiceFilterToModelUpdateFilter<ProjectImageDto, ProjectImage>(
      filter,
    );

    await this.projectImageRepository.delete(options);

    return true;
  }
}

export default ProjectImageService;
