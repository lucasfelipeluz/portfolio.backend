import { httpResponses } from '@/api/utils';
import { ApplicationError, ForbiddenError } from '@/core/errors';
import { strings } from '@/core/utils';
import { UserRole } from '@/domain/addons';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import Middleware from './Middleware';

@autoInjectable()
class AuthMiddlware extends Middleware {
  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    super(applicationConfigProvider);
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
      const { isSuccess, error, payload } = this.getAuthUser(request);
      if (!isSuccess && error) {
        throw new ForbiddenError(error);
      }

      if (!payload) {
        throw new ForbiddenError(strings.notPermissionError);
      }

      if (payload.role === UserRole.Admin) {
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
      const { isSuccess, error, payload } = this.getAuthUser(request);
      if (!isSuccess && error) {
        throw new ForbiddenError(error);
      }

      if (!payload) {
        throw new ForbiddenError(strings.credentialsCouldNotBeIdentified);
      }

      if (payload.role === UserRole.User || payload.role === UserRole.Admin) {
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
