import { FindOptions, UpdateOptions } from 'sequelize';
import UserModel from '../models/UserModel';
import User from '@/domain/entities/IUser';
import IUserRepository from '@infrastructure/interfaces/IUserRepository';

export default class UserRepository implements IUserRepository {
  async getAll(options?: FindOptions): Promise<User[]> {
    const result = await UserModel.findAll(options);

    if (result.length < 1) {
      return [] as User[];
    }

    return result.map((user) => user.toEntity());
  }

  async getOne(options: FindOptions): Promise<User | null> {
    const result = await UserModel.findOne(options);

    return result?.toEntity() ?? null;
  }

  async getById(id: number): Promise<User | null> {
    const result = await UserModel.findByPk(id);

    return result?.toEntity() ?? null;
  }

  async create(user: User): Promise<User> {
    const userModel = UserModel.userToModel(user);

    const result = await UserModel.create(userModel);

    return result.toEntity();
  }

  async update(user: User, options: UpdateOptions): Promise<number> {
    const result = await UserModel.update(user, options);

    return result[0];
  }

  async delete(options: UpdateOptions): Promise<number> {
    const result = await UserModel.update(
      {
        isActive: false,
      },
      options,
    );

    return result[0];
  }
}
