import { httpResponses } from '@/api/utils';
import { ApplicationError, ForbiddenError } from '@/core/errors';
import { PayloadAuthUser } from '@/core/types';
import { strings } from '@/core/utils';
import { UserRole } from '@/domain/addons';
import { IApplicationConfigProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import * as jwt from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AuthMiddlware {
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  private readonly userUrl: string[] = ['/api/about_me'];
  private readonly adminUrl: string[] = [];

  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    this.applicationConfigProvider = applicationConfigProvider;
  }

  private checkRole(user: PayloadAuthUser, baseUrl: string): boolean {
    if (user.role === UserRole.Admin) {
      if (this.userUrl.includes(baseUrl)) {
        return true;
      }
      if (this.adminUrl.includes(baseUrl)) {
        return true;
      }
    }

    if (user.role === UserRole.User) {
      if (this.userUrl.includes(baseUrl)) {
        return true;
      }
    }

    return false;
  }

  /**
   * The global way of dealing with the bearer token
   */
  private handle(headers: IncomingHttpHeaders): PayloadAuthUser {
    const { authorization } = headers;

    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      throw new ForbiddenError(strings.credentialsCouldNotBeIdentified);
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    const decoded = jwt.verify(token, authConfig.secretKey);

    return decoded as PayloadAuthUser;
  }

  /**
   * Middleware to handle the admin roles
   */
  public handleAdminRoles(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
    try {
      const payloadAuthUser = this.handle(request.headers);

      if (!payloadAuthUser) {
        throw new ForbiddenError(strings.notPermissionError);
      }

      request.cookies = {
        userLogged: payloadAuthUser,
      };

      if (payloadAuthUser.role === UserRole.Admin) {
        return next();
      }

      throw new ForbiddenError(strings.notPermissionError);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  /**
   * Middleware to handle the user roles
   */
  public handleUserRoles(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
    try {
      const payloadAuthUser = this.handle(request.headers);

      if (!payloadAuthUser) {
        throw new ForbiddenError(strings.credentialsCouldNotBeIdentified);
      }

      request.cookies = {
        userLogged: payloadAuthUser,
      };

      if (payloadAuthUser.role === UserRole.User || payloadAuthUser.role === UserRole.Admin) {
        return next();
      }

      throw new ForbiddenError(strings.notPermissionError);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default AuthMiddlware;
