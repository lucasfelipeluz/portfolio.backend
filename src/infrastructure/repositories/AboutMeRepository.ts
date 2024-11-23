import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { AboutMe } from '@/domain/entities';
import { injectable } from 'tsyringe';
import { IAboutMeRepository, IBaseRepository, ICacheProvider } from '../interfaces';
import { AboutMeModel } from '../models';
import relationships from '../models/addons/relationships';
import { CacheProvider } from '../providers';

@injectable()
class AboutMeRepository implements IBaseRepository<AboutMe>, IAboutMeRepository {
  private readonly cacheProvider: ICacheProvider<AboutMe>;

  constructor(cacheRepository: CacheProvider<AboutMe>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: ApplicationFilter<AboutMe>): Promise<AboutMe[]> {
    const cache = await this.cacheProvider.get(strings.aboutMe, options);

    if (cache) {
      return cache as AboutMe[];
    }

    const findOptions = transform.applicationFilterToFindOptions<AboutMe>(options);

    const result = await AboutMeModel.findAll({ ...findOptions, include: relationships.aboutMe });

    if (result.length < 1) {
      return [] as AboutMe[];
    }

    await this.cacheProvider.create(strings.aboutMe, options, result);

    return result as AboutMe[];
  }

  async getOne(options: ApplicationFilter<AboutMe>): Promise<AboutMe | null> {
    const cache = await this.cacheProvider.get(strings.aboutMe, options);

    if (cache) {
      return cache as AboutMe;
    }

    const findOptions = transform.applicationFilterToFindOptions<AboutMe>(options);

    const result = await AboutMeModel.findOne({ ...findOptions, include: relationships.aboutMe });

    if (result) {
      await this.cacheProvider.create(strings.aboutMe, options, result);
    }

    return result as AboutMe;
  }

  async create(entity: AboutMe, options: ApplicationEntityCreatingOptions): Promise<AboutMe> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions<AboutMe>(options);

    const result = await AboutMeModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

    return result as AboutMe;
  }

  async update(
    entity: AboutMe,
    options: ApplicationEntityUpdatingOptions<AboutMe>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions<AboutMe>(options);

    const result = await AboutMeModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<AboutMe>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions<AboutMe>(options);

    const result = await AboutMeModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

      return true;
    }

    return false;
  }
}

export default AboutMeRepository;
