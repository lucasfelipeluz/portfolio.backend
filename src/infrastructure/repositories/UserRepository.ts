import { strings } from '@/core/utils';
import { User } from '@/domain/entities';
import { IBaseRepository, ICacheProvider, IUserRepository } from '@/infrastructure/interfaces';
import { UserModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class UserRepository implements IBaseRepository<User>, IUserRepository {
  private readonly cacheProvider: ICacheProvider<User>;

  constructor(cacheProvider: CacheProvider<User>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: FindOptions<User>): Promise<User[]> {
    const cache = await this.cacheProvider.get(strings.users, options ?? {});

    if (cache) {
      return cache as User[];
    }

    const result = await UserModel.findAll({
      ...options,
      include: relationships.user,
    });

    if (result.length < 1) {
      return [] as User[];
    }

    await this.cacheProvider.create(strings.users, options ?? {}, result);

    return result as User[];
  }

  async getOne(options: FindOptions<User>): Promise<User | null> {
    const cache = await this.cacheProvider.get(strings.users, options ?? {});

    if (cache) {
      return cache as User;
    }

    const result = await UserModel.findOne({ ...options, include: relationships.user });

    if (result) {
      await this.cacheProvider.create(strings.users, options ?? {}, result);
    }

    return result as User;
  }

  async getById(id: number): Promise<User | null> {
    const cache = await this.cacheProvider.get(strings.users, { where: { id } });

    if (cache) {
      return cache as User;
    }

    const result = await UserModel.findOne({
      where: {
        id: id,
      },
      include: relationships.user,
    });

    if (result) {
      await this.cacheProvider.create(strings.users, { where: { id } }, result);
    }

    return result as User;
  }

  async create(entity: UserModel, options?: CreateOptions): Promise<User> {
    const result = await UserModel.create(entity, options);

    await this.cacheProvider.clearWhenStartingWith(strings.users);

    return result as User;
  }

  async update(entity: User, options: UpdateOptions<User>): Promise<boolean> {
    const result = await UserModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.users);

    return true;
  }

  async delete(options: UpdateOptions<User>): Promise<boolean> {
    const result = await UserModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.users);

      return true;
    }

    return false;
  }
}

export default UserRepository;
