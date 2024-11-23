import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';

interface IBaseRepository<T> {
  getAll(options: ApplicationFilter<T>): Promise<T[]>;
  getOne(options: ApplicationFilter<T>): Promise<T | null>;
  create(entity: T, options: ApplicationEntityCreatingOptions): Promise<T>;
  update(entity: T, options: ApplicationEntityUpdatingOptions<T>): Promise<boolean>;
  delete(options: ApplicationEntityDeletingOptions<T>): Promise<boolean>;
}

export default IBaseRepository;
