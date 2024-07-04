import strings from '@/domain/utils/strings';
import Project from '@domain/entities/Project';
import ProjectModel from '@infrastructure/models/ProjectModel';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import CacheProvider from '../cache/CacheProvider';
import ICacheProvider from '../cache/ICacheProvider';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectRepository from '../interfaces/IProjectRepository';
import includes from '../models/addons/relationships';

@injectable()
class ProjectRepository implements IBaseRepository<Project>, IProjectRepository {
  private readonly cacheProvider: ICacheProvider<Project>;

  constructor(cacheProvider: CacheProvider<Project>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options?: FindOptions): Promise<Project[]> {
    const cache = await this.cacheProvider.get(strings.projects, options?.where ?? {});

    if (cache) {
      return cache as Project[];
    }

    const result = await ProjectModel.findAll({
      ...options,
      include: includes.project,
    });

    if (result.length < 1) {
      return [] as Project[];
    }

    await this.cacheProvider.create(strings.projects, options?.where ?? {}, result);

    return result as Project[];
  }

  async getOne(options: FindOptions): Promise<Project | null> {
    const cache = await this.cacheProvider.get(strings.projects, options?.where ?? {});

    if (cache) {
      return cache as Project;
    }

    const result = await ProjectModel.findOne({ ...options, include: includes.project });

    if (result) {
      await this.cacheProvider.create(strings.projects, options?.where ?? {}, result);
    }

    return result as Project;
  }

  async getById(id: number): Promise<Project | null> {
    const cache = await this.cacheProvider.get(strings.projects, { id });

    if (cache) {
      return cache as Project;
    }

    const result = await ProjectModel.findOne({
      where: {
        id: id,
      },
      include: includes.project,
    });

    if (result) {
      await this.cacheProvider.create(strings.projects, { id }, result);
    }

    return result as Project;
  }

  async create(entity: Project): Promise<Project> {
    const result = await ProjectModel.create(entity);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as Project;
  }

  async update(entity: Project, options: UpdateOptions): Promise<boolean> {
    const result = await ProjectModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

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
      await this.cacheProvider.clearWhenStartingWithThese([
        strings.projects,
        strings.skills,
        strings.projectImages,
        strings.projectSkill,
      ]);

      return true;
    }

    return false;
  }
}

export default ProjectRepository;
