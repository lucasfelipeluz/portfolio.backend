import { injectable } from 'tsyringe';
import {
  IBaseRepository,
  ICacheProvider,
  IExperienceRepository,
} from '@/infrastructure/interfaces';
import { Experience } from '@/domain/entities';
import { FindOptions, UpdateOptions } from 'sequelize';
import { CacheProvider } from '../providers';
import { strings } from '@/core/utils';
import { ExperienceModel } from '../models';
import relationships from '../models/addons/relationships';

@injectable()
class ExperienceRepository implements IBaseRepository<Experience>, IExperienceRepository {
  private readonly cacheProvider: ICacheProvider<Experience>;

  constructor(cacheProvider: CacheProvider<Experience>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: FindOptions<Experience>): Promise<Experience[]> {
    const cache = await this.cacheProvider.get(strings.experience, options ?? {});

    if (cache) {
      return cache as Experience[];
    }

    const result = await ExperienceModel.findAll({ ...options, include: relationships.experience });

    if (result.length < 1) {
      return [] as Experience[];
    }

    await this.cacheProvider.create(strings.experience, options ?? {}, result);

    return result as Experience[];
  }

  async getOne(options: FindOptions<Experience>): Promise<Experience | null> {
    const cache = await this.cacheProvider.get(strings.experience, options ?? {});

    if (cache) {
      return cache as Experience;
    }

    const result = await ExperienceModel.findOne({ ...options, include: relationships.experience });

    if (result) {
      await this.cacheProvider.create(strings.experience, options ?? {}, result);
    }

    return result as Experience;
  }

  async getById(id: number): Promise<Experience | null> {
    const cache = await this.cacheProvider.get(strings.experience, { where: { id } });

    if (cache) {
      return cache as Experience;
    }

    const result = await ExperienceModel.findOne({
      where: {
        id: id,
      },
      include: relationships.experience,
    });

    if (result) {
      await this.cacheProvider.create(strings.experience, { where: { id } }, result);
    }

    return result as Experience;
  }

  async create(entity: Experience): Promise<Experience> {
    const result = await ExperienceModel.create(entity);

    await this.cacheProvider.clearWhenStartingWith(strings.experience);

    return result as Experience;
  }

  async update(entity: Experience, options: UpdateOptions<Experience>): Promise<boolean> {
    const result = await ExperienceModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.experience);

    return true;
  }

  async delete(options: UpdateOptions<Experience>): Promise<boolean> {
    const result = await ExperienceModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.experience);

      return true;
    }

    return false;
  }
}

export default ExperienceRepository;
