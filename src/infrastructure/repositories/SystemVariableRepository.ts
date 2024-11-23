import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { rules, strings, transform } from '@/core/utils';
import { SystemVariable } from '@/domain/entities';
import { injectable } from 'tsyringe';
import { IBaseRepository, ICacheProvider, ISystemVariableRepository } from '../interfaces';
import { SystemVariableModel } from '../models';
import relationships from '../models/addons/relationships';
import { CacheProvider } from '../providers';

@injectable()
class SystemVariableRepository
  implements IBaseRepository<SystemVariable>, ISystemVariableRepository
{
  private readonly cacheProvider: ICacheProvider<SystemVariable>;

  constructor(cacheRepository: CacheProvider<SystemVariable>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: ApplicationFilter<SystemVariable>): Promise<SystemVariable[]> {
    const cache = await this.cacheProvider.get(strings.systemVariable, options);

    if (cache) {
      return cache as SystemVariable[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SystemVariableModel.findAll(findOptions);

    if (result.length < 1) {
      return [] as SystemVariable[];
    }

    await this.cacheProvider.create(strings.systemVariable, options, result, {
      EX: rules.twoDays,
    });

    return result as SystemVariable[];
  }

  async getOne(options: ApplicationFilter<SystemVariable>): Promise<SystemVariable | null> {
    const cache = await this.cacheProvider.get(strings.systemVariable, options);

    if (cache) {
      return cache as SystemVariable;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SystemVariableModel.findOne({
      ...findOptions,
      include: relationships.systemVariable,
    });

    if (result) {
      await this.cacheProvider.create(strings.systemVariable, options, result, {
        EX: rules.twoDays,
      });
    }

    return result as SystemVariable;
  }

  async create(
    entity: SystemVariable,
    options: ApplicationEntityCreatingOptions,
  ): Promise<SystemVariable> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await SystemVariableModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

    return result as SystemVariable;
  }

  async update(
    entity: SystemVariable,
    options: ApplicationEntityUpdatingOptions<SystemVariable>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await SystemVariableModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<SystemVariable>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await SystemVariableModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.systemVariable);

      return true;
    }

    return false;
  }
}

export default SystemVariableRepository;
