import { MiddlewareAuthUserResponse, PayloadAuthUser } from '@/core/types';
import { strings } from '@/core/utils';
import { IApplicationConfigProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

abstract class Middleware {
  protected readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    this.applicationConfigProvider = applicationConfigProvider;
  }

  /**
   * The global way of dealing with the bearer token
   */
  protected getAuthUser(request: Request): MiddlewareAuthUserResponse {
    if (request.cookies && request.cookies.userLogged) {
      return { isSuccess: true, payload: request.cookies.userLogged as PayloadAuthUser };
    }

    const { authorization } = request.headers;

    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      return { isSuccess: false, error: strings.credentialsCouldNotBeIdentified };
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    const decoded = jwt.verify(token, authConfig.secretKey);

    request.cookies = {
      userLogged: decoded as PayloadAuthUser,
    };

    return { isSuccess: true, payload: decoded as PayloadAuthUser };
  }
}

export default Middleware;
