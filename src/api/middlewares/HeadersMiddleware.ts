import { httpResponses } from '@/api/utils';
import { ApplicationError } from '@/core/errors';
import { ClientSourceCount } from '@/core/types';
import { strings } from '@/core/utils';
import { ICacheProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider, CacheProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import Middleware from './Middleware';

@autoInjectable()
class HeadersMiddlware extends Middleware {
  private readonly cacheProvider: ICacheProvider<ClientSourceCount>;
  private readonly sourceOfAllowedClients: string[] =
    process.env.CLIENT_SOURCE_ALLOWED?.split(',') || [];

  constructor(
    cacheProvider: CacheProvider<ClientSourceCount>,
    applicationConfigProvider: ApplicationConfigProvider,
  ) {
    super(applicationConfigProvider);
    this.cacheProvider = cacheProvider;
  }

  private async updateCacheClientSource(newClientSource: ClientSourceCount): Promise<void> {
    const clientSource = await this.cacheProvider.get(strings.clientSource, {});

    let data: ClientSourceCount[] = [];

    if (!clientSource) {
      data.push(newClientSource);
    } else {
      data = clientSource as ClientSourceCount[];
      data.push(newClientSource);
    }

    await this.cacheProvider.create(strings.clientSource, {}, data, { EX: 60 * 60 * 24 });
  }

  public handle(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const { payload } = this.getAuthUser(request);

      const baseUrl = request.originalUrl;

      const data: ClientSourceCount = {
        route: baseUrl,
        timestamp: new Date().toISOString(),
        idUser: payload?.id || '',
      };

      this.updateCacheClientSource(data);

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
