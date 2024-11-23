import { ServiceFilter } from '@/core/types';
import { SetOptions } from 'redis';

interface ICacheProvider<T> {
  get(scope: string, filter: ServiceFilter<T>): Promise<T[] | T | null>;
  create(
    scope: string,
    filter: ServiceFilter<T>,
    value: T | T[],
    options?: SetOptions,
  ): Promise<void>;
  clearWhenStartingWith(scope: string): Promise<void>;
  clearWhenStartingWithThese(scopes: string[]): Promise<void>;
  clearAll(): Promise<void>;
}

export default ICacheProvider;
