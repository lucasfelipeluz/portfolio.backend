import { strings } from '@/core/utils';
import { SystemVariable } from '@/domain/entities';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import { IBaseRepository, ICacheProvider, ISystemVariableRepository } from '../interfaces';
import { SystemVariableModel } from '../models';
import relationships from '../models/addons/relationships';
import { CacheProvider } from '../providers';

@injectable()
class AboutMeRepository implements IBaseRepository<SystemVariable>, ISystemVariableRepository {
  private readonly cacheProvider: ICacheProvider<SystemVariable>;

  constructor(cacheRepository: CacheProvider<SystemVariable>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: FindOptions): Promise<SystemVariable[]> {
    const cache = await this.cacheProvider.get(strings.systemVariable, options ?? {});

    if (cache) {
      return cache as SystemVariable[];
    }

    const result = await SystemVariableModel.findAll();

    if (result.length < 1) {
      return [] as SystemVariable[];
    }

    await this.cacheProvider.create(strings.systemVariable, options ?? {}, result);

    return result as SystemVariable[];
  }

  async getOne(options: FindOptions): Promise<SystemVariable | null> {
    const cache = await this.cacheProvider.get(strings.systemVariable, options ?? {});

    if (cache) {
      return cache as SystemVariable;
    }

    const result = await SystemVariableModel.findOne({
      ...options,
      include: relationships.systemVariable,
    });

    if (result) {
      await this.cacheProvider.create(strings.systemVariable, options ?? {}, result);
    }

    return result as SystemVariable;
  }

  async getById(id: number): Promise<SystemVariable | null> {
    const cache = await this.cacheProvider.get(strings.systemVariable, { where: { id } });

    if (cache) {
      return cache as SystemVariable;
    }

    const result = await SystemVariableModel.findOne({
      where: {
        id: id,
      },
      include: relationships.systemVariable,
    });

    if (result) {
      await this.cacheProvider.create(strings.systemVariable, { where: { id } }, result);
    }

    return result as SystemVariable;
  }

  async create(entity: SystemVariable): Promise<SystemVariable> {
    const result = await SystemVariableModel.create(entity);

    await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

    return result as SystemVariable;
  }

  async update(entity: SystemVariable, options: UpdateOptions): Promise<boolean> {
    const result = await SystemVariableModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    const result = await SystemVariableModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

      return true;
    }

    return false;
  }
}

export default AboutMeRepository;
