import { strings, transform } from '@/core/utils';
import { Experience } from '@/domain/entities';
import {
  IBaseRepository,
  ICacheProvider,
  IExperienceRepository,
} from '@/infrastructure/interfaces';
import { injectable } from 'tsyringe';
import { ExperienceModel } from '../models';
import relationships from '../models/addons/relationships';
import { CacheProvider } from '../providers';

import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationFilter,
} from '@/core/types';

@injectable()
class ExperienceRepository implements IBaseRepository<Experience>, IExperienceRepository {
  private readonly cacheProvider: ICacheProvider<Experience>;

  constructor(cacheProvider: CacheProvider<Experience>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<Experience>): Promise<Experience[]> {
    const cache = await this.cacheProvider.get(strings.experience, options);

    if (cache) {
      return cache as Experience[];
    }

    const findOptions = transform.applicationFilterToFindOptions<Experience>(options);

    const result = await ExperienceModel.findAll({
      ...findOptions,
      include: relationships.experience,
    });

    if (result.length < 1) {
      return [] as Experience[];
    }

    await this.cacheProvider.create(strings.experience, options, result);

    return result as Experience[];
  }

  async getOne(options: ApplicationFilter<Experience>): Promise<Experience | null> {
    const cache = await this.cacheProvider.get(strings.experience, options);

    if (cache) {
      return cache as Experience;
    }

    const findOptions = transform.applicationFilterToFindOptions<Experience>(options);

    const result = await ExperienceModel.findOne({
      ...findOptions,
      include: relationships.experience,
    });

    if (result) {
      await this.cacheProvider.create(strings.experience, options, result);
    }

    return result as Experience;
  }

  async create(entity: Experience, options: ApplicationEntityCreatingOptions): Promise<Experience> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await ExperienceModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.experience);

    return result as Experience;
  }

  async update(entity: Experience, options: ApplicationEntityCreatingOptions): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await ExperienceModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.experience);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<Experience>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await ExperienceModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.experience);

      return true;
    }

    return false;
  }
}

export default ExperienceRepository;
