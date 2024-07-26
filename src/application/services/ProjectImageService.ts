import { CreateProjectImageDto, ProjectImageDto } from '@/application/dtos';
import { IProjectImageService } from '@/application/interfaces';
import { ServiceFilter } from '@/core/types';
import { transform } from '@/core/utils';
import { ProjectImage } from '@/domain/entities';
import { IProjectImageRepository } from '@/infrastructure/interfaces';
import { ProjectImageRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';

@injectable()
class ProjectImageService implements IProjectImageService {
  private readonly projectImageRepository: IProjectImageRepository;

  constructor(projectImageRepository: ProjectImageRepository) {
    this.projectImageRepository = projectImageRepository;
  }

  async create(entity: CreateProjectImageDto): Promise<ProjectImageDto> {
    const newEntity = entity.toDomain();

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
