import Project from '@/domain/entities/Project';
import ProjectModel from '@/infrastructure/models/ProjectModel';
import ProjectRepository from '@/infrastructure/repositories/ProjectRepository';
import { FindOptions, UpdateOptions, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import IProjectService from '../interfaces/IProjectService';

@injectable()
class ProjectService implements IProjectService {
  private readonly projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async getAll(filter?: WhereOptions): Promise<Project[]> {
    const options: FindOptions = {
      where: filter,
    };

    return await this.projectRepository.getAll(options);
  }

  async getOne(filter?: WhereOptions<ProjectModel> | undefined): Promise<Project | null> {
    const options: FindOptions = {
      where: filter,
    };

    return await this.projectRepository.getOne(options);
  }

  async getById(id: number): Promise<Project | null> {
    const result = await this.projectRepository.getById(id);

    return result || ({} as Project);
  }

  async create(project: Project): Promise<Project> {
    return await this.projectRepository.create(project);
  }

  async update(project: Project, filter: WhereOptions<ProjectModel>): Promise<Project> {
    const options: UpdateOptions<ProjectModel> = {
      where: filter,
    };

    await this.projectRepository.update(project, options);

    return project;
  }

  async delete(id: number): Promise<boolean> {
    const options: UpdateOptions<ProjectModel> = {
      where: {
        id: id,
      },
    };

    await this.projectRepository.delete(options);

    return true;
  }
}

export default ProjectService;
