import { AuthConfig, ExpiresIn } from '@/core/types';
import { RoutineConfig } from '@/core/types/routineConfig';
import { IApplicationConfigProvider } from '@/infrastructure/interfaces';
import { config, DotenvConfigOutput } from 'dotenv';
import { injectable } from 'tsyringe';

@injectable()
class ApplicationConfigProvider implements IApplicationConfigProvider {
  private readonly envProvider: DotenvConfigOutput = config();

  getRoutinesConfig(): RoutineConfig {
    const enabled = process.env.ENABLED_ROUTINES === 'true';

    return {
      enabled: enabled,
    };
  }

  getAuthConfig(): AuthConfig {
    const salt = parseInt(process.env.TOKEN_SALT || '0');
    const expiresIn = process.env.TOKEN_EXPIRES_IN || '1d';
    const secretKey = process.env.TOKEN_SECRET_KEY || 'teste';

    return {
      salt: salt,
      expiresIn: expiresIn as ExpiresIn,
      secretKey: secretKey,
    };
  }
}

export default ApplicationConfigProvider;
