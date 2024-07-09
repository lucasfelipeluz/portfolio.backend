import { CreateProjectImageDto, ProjectImageDto } from '@/application/dtos';
import { IProjectImageService } from '@/application/interfaces';
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
    const entityToUpdate = {
      viewPriority,
    } as ProjectImage;

    await this.projectImageRepository.update(entityToUpdate, {
      where: { id },
    });

    return new ProjectImageDto(entityToUpdate);
  }

  async delete(id: number): Promise<boolean> {
    await this.projectImageRepository.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}

export default ProjectImageService;
