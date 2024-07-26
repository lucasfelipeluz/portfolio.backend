import { ProjectSkill } from '@/domain/entities';
import { strings } from '@/core/utils';
import {
  IBaseRepository,
  ICacheProvider,
  IProjectSkillRepository,
} from '@/infrastructure/interfaces';
import { ProjectSkillModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { BulkCreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class ProjectSkillRepository implements IBaseRepository<ProjectSkill>, IProjectSkillRepository {
  private readonly cacheProvider: ICacheProvider<ProjectSkill>;

  constructor(cacheProvider: CacheProvider<ProjectSkill>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: FindOptions): Promise<ProjectSkill[]> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options ?? {});

    if (cache) {
      return cache as ProjectSkill[];
    }

    const result = await ProjectSkillModel.findAll({
      ...options,
      include: relationships.projectSkill,
    });

    if (result.length < 1) {
      return [] as ProjectSkill[];
    }

    await this.cacheProvider.create(strings.projectSkill, options ?? {}, result);

    return result as ProjectSkill[];
  }

  async getOne(options: FindOptions): Promise<ProjectSkill | null> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options ?? {});

    if (cache) {
      return cache as ProjectSkill;
    }

    const result = await ProjectSkillModel.findOne({
      ...options,
      include: relationships.projectSkill,
    });

    if (result) {
      await this.cacheProvider.create(strings.projectSkill, options ?? {}, result);
    }

    return result as ProjectSkill;
  }

  async getById(id: number): Promise<ProjectSkill | null> {
    const cache = await this.cacheProvider.get(strings.projectSkill, { where: { id } });

    if (cache) {
      return cache as ProjectSkill;
    }

    const result = await ProjectSkillModel.findOne({
      where: {
        id: id,
      },
      include: relationships.projectSkill,
    });

    if (!result) {
      return null;
    }

    await this.cacheProvider.create(strings.projectSkill, { where: { id } }, result);

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

  async update(entity: ProjectSkill, options: UpdateOptions): Promise<boolean> {
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
  async delete(options: UpdateOptions): Promise<boolean> {
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
