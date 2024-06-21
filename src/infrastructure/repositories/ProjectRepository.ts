import Project from '@domain/entities/Project';
import ProjectModel from '@infrastructure/models/ProjectModel';
import { FindOptions, UpdateOptions } from 'sequelize';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectRepository from '../interfaces/IProjectRepository';
import includes from '../models/addons/includes';
import { injectable } from 'tsyringe';

@injectable()
class ProjectRepository implements IBaseRepository<Project>, IProjectRepository {
  async getAll(options?: FindOptions): Promise<Project[]> {
    const result = await ProjectModel.findAll({
      ...options,
      include: includes.project,
    });

    if (result.length < 1) {
      return [] as Project[];
    }

    return result.map((user) => user.toEntity());
  }

  async getOne(options: FindOptions): Promise<Project | null> {
    const result = await ProjectModel.findOne({ ...options, include: includes.project });

    return result?.toEntity() ?? null;
  }

  async getById(id: number): Promise<Project | null> {
    const result = await ProjectModel.findOne({
      where: {
        id: id,
      },
      include: includes.project,
    });

    return result?.toEntity() ?? null;
  }

  async create(user: Project): Promise<Project> {
    const result = await ProjectModel.create(user);

    return result.toEntity();
  }

  async update(user: Project, options: UpdateOptions): Promise<boolean> {
    const result = await ProjectModel.update(user, options);

    if (result[0] < 1) {
      return false;
    }

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    await ProjectModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    return true;
  }
}

export default ProjectRepository;
