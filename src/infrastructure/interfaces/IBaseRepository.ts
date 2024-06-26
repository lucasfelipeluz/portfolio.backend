import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';

interface IBaseRepository<T> {
  getAll(options: FindOptions): Promise<T[]>;
  getOne(options: FindOptions): Promise<T | null>;
  getById(id: number): Promise<T | null>;
  create(entity: T, options?: CreateOptions): Promise<T>;
  update(entity: T, options: UpdateOptions): Promise<boolean>;
  delete(options: UpdateOptions): Promise<boolean>;
}

export default IBaseRepository;
