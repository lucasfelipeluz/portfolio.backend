import ProjectSkill from '@/domain/entities/ProjectSkill';
import { BulkCreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectSkillRepository from '../interfaces/IProjectSkillRepository';
import ProjectSkillModel from '../models/ProjectSkillModel';
import includes from '../models/addons/relationships';
import ICacheProvider from '../cache/ICacheProvider';
import CacheProvider from '../cache/CacheProvider';
import strings from '@/domain/utils/strings';

@injectable()
class ProjectSkillRepository implements IBaseRepository<ProjectSkill>, IProjectSkillRepository {
  private readonly cacheProvider: ICacheProvider<ProjectSkill>;

  constructor(cacheProvider: CacheProvider<ProjectSkill>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: FindOptions<any>): Promise<ProjectSkill[]> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options?.where ?? {});

    if (cache) {
      return cache as ProjectSkill[];
    }

    const result = await ProjectSkillModel.findAll({
      ...options,
      include: includes.projectSkill,
    });

    if (result.length < 1) {
      return [] as ProjectSkill[];
    }

    await this.cacheProvider.create(strings.projectSkill, options?.where ?? {}, result);

    return result as ProjectSkill[];
  }

  async getOne(options: FindOptions<any>): Promise<ProjectSkill | null> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options?.where ?? {});

    if (cache) {
      return cache as ProjectSkill;
    }

    const result = await ProjectSkillModel.findOne({ ...options, include: includes.projectSkill });

    if (result) {
      await this.cacheProvider.create(strings.projectSkill, options?.where ?? {}, result);
    }

    return result as ProjectSkill;
  }

  async getById(id: number): Promise<ProjectSkill | null> {
    const cache = await this.cacheProvider.get(strings.projectSkill, { id });

    if (cache) {
      return cache as ProjectSkill;
    }

    const result = await ProjectSkillModel.findOne({
      where: {
        id: id,
      },
      include: includes.projectSkill,
    });

    if (!result) {
      return null;
    }

    await this.cacheProvider.create(strings.projectSkill, { id }, result);

    return result as ProjectSkill;
  }

  async create(entity: ProjectSkill): Promise<ProjectSkill> {
    const result = await ProjectSkillModel.create(entity);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as ProjectSkill;
  }

  async bulkCreate(entity: ProjectSkill[], options?: BulkCreateOptions): Promise<ProjectSkill[]> {
    const result = await ProjectSkillModel.bulkCreate(entity, options);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as ProjectSkill[];
  }

  async update(entity: ProjectSkill, options: UpdateOptions<any>): Promise<boolean> {
    const result = await ProjectSkillModel.update(entity, options);

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
  async delete(options: UpdateOptions<any>): Promise<boolean> {
    const result = await ProjectSkillModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

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
}

export default ProjectSkillRepository;
