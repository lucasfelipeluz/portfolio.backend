import strings from '@/domain/utils/strings';
import ProjectImage from '@domain/entities/ProjectImage';
import ProjectImageModel from '@infrastructure/models/ProjectImageModel';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import CacheProvider from '../cache/CacheProvider';
import ICacheProvider from '../cache/ICacheProvider';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectImageRepository from '../interfaces/IProjectImageRepository';
import includes from '../models/addons/relationships';

@injectable()
class ProjectImageRepository implements IBaseRepository<ProjectImage>, IProjectImageRepository {
  private readonly cacheProvider: ICacheProvider<ProjectImage>;

  constructor(cacheProvider: CacheProvider<ProjectImage>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options?: FindOptions): Promise<ProjectImage[]> {
    const cache = await this.cacheProvider.get(strings.projectImages, options?.where ?? {});

    if (cache) {
      return cache as ProjectImage[];
    }

    const result = await ProjectImageModel.findAll({
      ...options,
      include: includes.project,
    });

    if (result.length < 1) {
      return [] as ProjectImage[];
    }

    await this.cacheProvider.create(strings.projects, options?.where ?? {}, result);

    return result as ProjectImage[];
  }

  async getOne(options: FindOptions): Promise<ProjectImage | null> {
    const cache = await this.cacheProvider.get(strings.projectImages, options?.where ?? {});

    if (cache) {
      return cache as ProjectImage;
    }

    const result = await ProjectImageModel.findOne({ ...options, include: includes.project });

    if (result) {
      await this.cacheProvider.create(strings.projectImages, options?.where ?? {}, result);
    }

    return result as ProjectImage;
  }

  async getById(id: number): Promise<ProjectImage | null> {
    const cache = await this.cacheProvider.get(strings.projectImages, { id });

    if (cache) {
      return cache as ProjectImage;
    }

    const result = await ProjectImageModel.findOne({
      where: {
        id: id,
      },
      include: includes.project,
    });

    if (result) {
      await this.cacheProvider.create(strings.projects, { id }, result);
    }

    return result as ProjectImage;
  }

  async create(entity: ProjectImage): Promise<ProjectImage> {
    const result = await ProjectImageModel.create(entity);

    await this.cacheProvider.clearWhenStartingWithThese([strings.projects, strings.projectImages]);

    return result as ProjectImage;
  }

  async update(entity: ProjectImage, options: UpdateOptions): Promise<boolean> {
    const result = await ProjectImageModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWithThese([strings.projects, strings.projectImages]);

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
      await this.cacheProvider.clearWhenStartingWithThese([
        strings.projects,
        strings.projectImages,
      ]);

      return true;
    }

    return false;
  }
}

export default ProjectImageRepository;
