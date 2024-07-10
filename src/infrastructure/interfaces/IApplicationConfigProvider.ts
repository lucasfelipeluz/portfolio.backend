import { AuthConfig } from '@/core/types';

interface IApplicationConfigProvider {
  getAuthConfig(): AuthConfig;
}

export default IApplicationConfigProvider;
