import { AuthConfig } from '@/core/types';
import { RoutineConfig } from '@/core/types/routineConfig';
import { StorageConfig } from '@/core/types/storage';

interface IApplicationConfigProvider {
  getRoutinesConfig(): RoutineConfig;
  getAuthConfig(): AuthConfig;
  getStorageConfig(): StorageConfig;
}

export default IApplicationConfigProvider;
