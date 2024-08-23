import { httpResponses } from '@/api/utils';
import { ApplicationError, ForbiddenError } from '@/core/errors';
import { HeadersMiddlwareInput } from '@/core/types';
import { strings } from '@/core/utils';
import { IApplicationConfigProvider, ICacheProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider, CacheProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class HeadersMiddlware {
  private readonly applicationConfigProvider: IApplicationConfigProvider;
  private readonly cacheProvider: ICacheProvider<HeadersMiddlwareInput>;
  private readonly sourceOfAllowedClients: string[] =
    process.env.CLIENT_SOURCE_ALLOWED?.split(',') || [];

  constructor(
    applicationConfigProvider: ApplicationConfigProvider,
    cacheProvider: CacheProvider<HeadersMiddlwareInput>,
  ) {
    this.applicationConfigProvider = applicationConfigProvider;
    this.cacheProvider = cacheProvider;
  }

  handle(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const clientSource = request.headers['x-client-source'];

      if (!clientSource || !this.sourceOfAllowedClients.includes(clientSource.toString())) {
        throw new ForbiddenError(strings.clientIdentifierError + strings.urlSwaggerDocs);
      }

      const data: HeadersMiddlwareInput = {
        clientSource: clientSource?.toString(),
        timestamp: new Date().toISOString(),
      };

      this.cacheProvider.create(strings.clientSource, {}, data);

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

export default HeadersMiddlware;
