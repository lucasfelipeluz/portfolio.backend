import { Skill } from '@/domain/entities';
import { strings } from '@/core/utils';
import { IBaseRepository, ICacheProvider, ISkillRepository } from '@/infrastructure/interfaces';
import { SkillModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class SkillRepository implements IBaseRepository<Skill>, ISkillRepository {
  private readonly cacheProvider: ICacheProvider<Skill>;

  constructor(cacheProvider: CacheProvider<Skill>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: FindOptions<any>): Promise<Skill[]> {
    const cache = await this.cacheProvider.get(strings.skills, options?.where ?? {});

    if (cache) {
      return cache as Skill[];
    }

    const result = await SkillModel.findAll({
      ...options,
      include: relationships.skill,
    });

    if (result.length < 1) {
      return [] as Skill[];
    }

    await this.cacheProvider.create(strings.skills, options?.where ?? {}, result);

    return result as Skill[];
  }

  async getOne(options: FindOptions<any>): Promise<Skill | null> {
    const cache = await this.cacheProvider.get(strings.skills, options?.where ?? {});

    if (cache) {
      return cache as Skill;
    }

    const result = await SkillModel.findOne({ ...options, include: relationships.skill });

    if (result) {
      await this.cacheProvider.create(strings.skills, options?.where ?? {}, result);
    }

    return result as Skill;
  }

  async getById(id: number): Promise<Skill | null> {
    const cache = await this.cacheProvider.get(strings.skills, { id });

    if (cache) {
      return cache as Skill;
    }

    const result = await SkillModel.findOne({
      where: {
        id: id,
      },
      include: relationships.skill,
    });

    if (result) {
      await this.cacheProvider.create(strings.skills, { id }, result);
    }

    return result as Skill;
  }

  async create(entity: Skill): Promise<Skill> {
    const result = await SkillModel.create(entity);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as Skill;
  }

  async update(entity: Skill, options: UpdateOptions<any>): Promise<boolean> {
    const result = await SkillModel.update(entity, options);

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
    const result = await SkillModel.update(
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

export default SkillRepository;
