import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { User } from '@/domain/entities';
import { IBaseRepository, ICacheProvider, IUserRepository } from '@/infrastructure/interfaces';
import { UserModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class UserRepository implements IBaseRepository<User>, IUserRepository {
  private readonly cacheProvider: ICacheProvider<User>;

  constructor(cacheProvider: CacheProvider<User>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<User>): Promise<User[]> {
    const cache = await this.cacheProvider.get(strings.users, options);

    if (cache) {
      return cache as User[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await UserModel.findAll({
      ...findOptions,
      include: relationships.user,
    });

    if (result.length < 1) {
      return [] as User[];
    }

    await this.cacheProvider.create(strings.users, options, result);

    return result as User[];
  }

  async getOne(options: ApplicationFilter<User>): Promise<User | null> {
    const cache = await this.cacheProvider.get(strings.users, options);

    if (cache) {
      return cache as User;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await UserModel.findOne({ ...findOptions, include: relationships.user });

    if (result) {
      await this.cacheProvider.create(strings.users, options, result);
    }

    return result as User;
  }

  async create(entity: UserModel, options: ApplicationEntityCreatingOptions): Promise<User> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await UserModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.users);

    return result as User;
  }

  async update(entity: User, options: ApplicationEntityUpdatingOptions<User>): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await UserModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.users);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<User>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await UserModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.users);

      return true;
    }

    return false;
  }
}

export default UserRepository;
