import ProjectImage from '@domain/entities/ProjectImage';
import ProjectImageModel from '@infrastructure/models/ProjectImageModel';
import { FindOptions, UpdateOptions } from 'sequelize';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectImageRepository from '../interfaces/IProjectImageRepository';
import includes from '../models/addons/relationships';
import { injectable } from 'tsyringe';

@injectable()
class ProjectImageRepository implements IBaseRepository<ProjectImage>, IProjectImageRepository {
  async getAll(options?: FindOptions): Promise<ProjectImage[]> {
    const result = await ProjectImageModel.findAll({
      ...options,
      include: includes.project,
    });

    if (result.length < 1) {
      return [] as ProjectImage[];
    }

    return result as ProjectImage[];
  }

  async getOne(options: FindOptions): Promise<ProjectImage | null> {
    const result = await ProjectImageModel.findOne({ ...options, include: includes.project });

    return result as ProjectImage;
  }

  async getById(id: number): Promise<ProjectImage | null> {
    const result = await ProjectImageModel.findOne({
      where: {
        id: id,
      },
      include: includes.project,
    });

    return result as ProjectImage;
  }

  async create(entity: ProjectImage): Promise<ProjectImage> {
    const result = await ProjectImageModel.create(entity);

    return result as ProjectImage;
  }

  async update(entity: ProjectImage, options: UpdateOptions): Promise<boolean> {
    const result = await ProjectImageModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    const result = await ProjectImageModel.update(
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

export default ProjectImageRepository;
