import { FindOptions } from 'sequelize';

interface ICacheProvider<T> {
  get(key: string, filter: FindOptions): Promise<T[] | T | null>;
  create(key: string, filter: FindOptions, value: T | T[]): Promise<void>;
  clearWhenStartingWith(key: string): Promise<void>;
  clearWhenStartingWithThese(keys: string[]): Promise<void>;
  clearAll(): Promise<void>;
}

export default ICacheProvider;
