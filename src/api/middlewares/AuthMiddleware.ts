import { httpResponses } from '@/api/utils';
import { UserDto } from '@/application/dtos';
import { ApplicationError, ForbiddenError } from '@/core/errors';
import { strings } from '@/core/utils';
import { IApplicationConfigProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AuthMiddlware {
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    this.applicationConfigProvider = applicationConfigProvider;
  }

  handle(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const { authorization } = request.headers;

      const token = authorization?.replace('Bearer ', '');

      if (!token) {
        throw new ForbiddenError(strings.notPermissionError);
      }

      const authConfig = this.applicationConfigProvider.getAuthConfig();

      const decoded = jwt.verify(token, authConfig.secretKey);

      request.cookies = {
        userLogged: decoded as UserDto,
      };

      return next();
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
