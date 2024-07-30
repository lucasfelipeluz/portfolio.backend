import { AuthConfig } from '@/core/types';
import { RoutineConfig } from '@/core/types/routineConfig';

interface IApplicationConfigProvider {
  getRoutinesConfig(): RoutineConfig;
  getAuthConfig(): AuthConfig;
}

export default IApplicationConfigProvider;
