import { WhereOptions } from 'sequelize';

interface ICacheProvider<T> {
  get(key: string, filter: WhereOptions): Promise<T[] | T | null>;
  create(key: string, filter: WhereOptions, value: T | T[]): Promise<void>;
  clearWhenStartingWith(key: string): Promise<void>;
  clearWhenStartingWithThese(keys: string[]): Promise<void>;
  clearAll(): Promise<void>;
}

export default ICacheProvider;
