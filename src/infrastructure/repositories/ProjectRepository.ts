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

    return result.map((entity) => entity.toEntity());
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

  async create(entity: Project): Promise<Project> {
    const result = await ProjectModel.create(entity);

    return result.toEntity();
  }

  async update(entity: Project, options: UpdateOptions): Promise<boolean> {
    const result = await ProjectModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    const result = await ProjectModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      return true;
    }

    return false;
  }
}

export default ProjectRepository;
