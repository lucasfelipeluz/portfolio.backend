import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { ProjectSkill } from '@/domain/entities';
import {
  IBaseRepository,
  ICacheProvider,
  IProjectSkillRepository,
} from '@/infrastructure/interfaces';
import { ProjectSkillModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class ProjectSkillRepository implements IBaseRepository<ProjectSkill>, IProjectSkillRepository {
  private readonly cacheProvider: ICacheProvider<ProjectSkill>;

  constructor(cacheProvider: CacheProvider<ProjectSkill>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<ProjectSkill>): Promise<ProjectSkill[]> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options);

    if (cache) {
      return cache as ProjectSkill[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectSkillModel.findAll({
      ...findOptions,
      include: relationships.projectSkill,
    });

    if (result.length < 1) {
      return [] as ProjectSkill[];
    }

    await this.cacheProvider.create(strings.projectSkill, options, result);

    return result as ProjectSkill[];
  }

  async getOne(options: ApplicationFilter<ProjectSkill>): Promise<ProjectSkill | null> {
    const cache = await this.cacheProvider.get(strings.projectSkill, options);

    if (cache) {
      return cache as ProjectSkill;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectSkillModel.findOne({
      ...findOptions,
      include: relationships.projectSkill,
    });

    if (result) {
      await this.cacheProvider.create(strings.projectSkill, options, result);
    }

    return result as ProjectSkill;
  }

  async create(
    entity: ProjectSkill,
    options: ApplicationEntityCreatingOptions,
  ): Promise<ProjectSkill> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await ProjectSkillModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as ProjectSkill;
  }

  async bulkCreate(
    entity: ProjectSkill[],
    options: ApplicationEntityCreatingOptions,
  ): Promise<ProjectSkill[]> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await ProjectSkillModel.bulkCreate(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as ProjectSkill[];
  }

  async update(
    entity: ProjectSkill,
    options: ApplicationEntityUpdatingOptions<ProjectSkill>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await ProjectSkillModel.update(entity, updateOptions);

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
  async delete(options: ApplicationEntityDeletingOptions<ProjectSkill>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await ProjectSkillModel.update(
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

export default ProjectSkillRepository;
