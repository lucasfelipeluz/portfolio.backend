import ProjectImage from '@/domain/entities/ProjectImage';
import IProjectImageRepository from '@/infrastructure/interfaces/IProjectImageRepository';
import ProjectImageRepository from '@/infrastructure/repositories/ProjectImageRepository';
import { injectable } from 'tsyringe';
import CreateProjectImageDto from '../dtos/CreateProjectImageDto';
import ProjectImageDto from '../dtos/ProjectImageDto';
import IProjectImageService from '../interfaces/IProjectImageService';

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
