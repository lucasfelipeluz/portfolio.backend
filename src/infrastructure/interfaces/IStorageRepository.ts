import { CreateStorageItem, StorageItem } from '@/core/types';
import { DeleteStorageItem } from '@/core/types/storage';

interface IStorageProvider {
  getAll(): Promise<StorageItem[]>;
  create(data: CreateStorageItem): Promise<StorageItem>;
  delete(data: DeleteStorageItem): Promise<void>;
}

export default IStorageProvider;
