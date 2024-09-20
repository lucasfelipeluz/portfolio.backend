import { AboutMe } from '@/domain/entities';
import { IAboutMeRepository, IBaseRepository, ICacheProvider } from '../interfaces';
import { injectable } from 'tsyringe';
import { CacheProvider } from '../providers';
import { AboutMeModel } from '../models';
import { strings } from '@/core/utils';
import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import relationships from '../models/addons/relationships';

@injectable()
class AboutMeRepository implements IBaseRepository<AboutMe>, IAboutMeRepository {
  private readonly cacheProvider: ICacheProvider<AboutMe>;

  constructor(cacheRepository: CacheProvider<AboutMe>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: FindOptions): Promise<AboutMe[]> {
    const cache = await this.cacheProvider.get(strings.aboutMe, options ?? {});

    if (cache) {
      return cache as AboutMe[];
    }

    const result = await AboutMeModel.findAll({ ...options, include: relationships.aboutMe });

    if (result.length < 1) {
      return [] as AboutMe[];
    }

    await this.cacheProvider.create(strings.aboutMe, options ?? {}, result);

    return result as AboutMe[];
  }

  async getOne(options: FindOptions): Promise<AboutMe | null> {
    const cache = await this.cacheProvider.get(strings.aboutMe, options ?? {});

    if (cache) {
      return cache as AboutMe;
    }

    const result = await AboutMeModel.findOne({ ...options, include: relationships.aboutMe });

    if (result) {
      await this.cacheProvider.create(strings.aboutMe, options ?? {}, result);
    }

    return result as AboutMe;
  }

  async getById(id: number): Promise<AboutMe | null> {
    const cache = await this.cacheProvider.get(strings.aboutMe, { where: { id } });

    if (cache) {
      return cache as AboutMe;
    }

    const result = await AboutMeModel.findOne({
      where: {
        id: id,
      },
      include: relationships.aboutMe,
    });

    if (result) {
      await this.cacheProvider.create(strings.aboutMe, { where: { id } }, result);
    }

    return result as AboutMe;
  }

  async create(entity: AboutMe, options?: CreateOptions): Promise<AboutMe> {
    const result = await AboutMeModel.create(entity, options);

    await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

    return result as AboutMe;
  }

  async update(entity: AboutMe, options: UpdateOptions): Promise<boolean> {
    const result = await AboutMeModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    const result = await AboutMeModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.aboutMe);

      return true;
    }

    return false;
  }
}

export default AboutMeRepository;
