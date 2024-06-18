import User from '@/domain/entities/IUser';
import { FindOptions, UpdateOptions } from 'sequelize';

interface IUserRepository {
  getAll(options: FindOptions): Promise<User[]>;
  getOne(options: FindOptions): Promise<User | null>;
  getById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User, options: UpdateOptions): Promise<number>;
  delete(options: UpdateOptions): Promise<number>;
}

export default IUserRepository;
