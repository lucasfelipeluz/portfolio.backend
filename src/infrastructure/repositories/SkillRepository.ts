import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { Skill } from '@/domain/entities';
import { IBaseRepository, ICacheProvider, ISkillRepository } from '@/infrastructure/interfaces';
import { SkillModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class SkillRepository implements IBaseRepository<Skill>, ISkillRepository {
  private readonly cacheProvider: ICacheProvider<Skill>;

  constructor(cacheProvider: CacheProvider<Skill>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<Skill>): Promise<Skill[]> {
    const cache = await this.cacheProvider.get(strings.skills, options);

    if (cache) {
      return cache as Skill[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SkillModel.findAll({
      ...findOptions,
      include: relationships.skill,
    });

    if (result.length < 1) {
      return [] as Skill[];
    }

    await this.cacheProvider.create(strings.skills, options, result);

    return result as Skill[];
  }

  async getOne(options: ApplicationFilter<Skill>): Promise<Skill | null> {
    const cache = await this.cacheProvider.get(strings.skills, options);

    if (cache) {
      return cache as Skill;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SkillModel.findOne({ ...findOptions, include: relationships.skill });

    if (result) {
      await this.cacheProvider.create(strings.skills, options, result);
    }

    return result as Skill;
  }

  async create(entity: Skill, options: ApplicationEntityCreatingOptions): Promise<Skill> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await SkillModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as Skill;
  }

  async update(entity: Skill, options: ApplicationEntityUpdatingOptions<Skill>): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await SkillModel.update(entity, updateOptions);

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
  async delete(options: ApplicationEntityDeletingOptions<Skill>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions<Skill>(options);

    const result = await SkillModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
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
