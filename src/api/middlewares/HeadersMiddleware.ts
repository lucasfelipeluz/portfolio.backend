import { httpResponses } from '@/api/utils';
import { ApplicationError, ForbiddenError } from '@/core/errors';
import { ClientSourceCountInput } from '@/core/types';

import { strings } from '@/core/utils';
import { IApplicationConfigProvider, ICacheProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider, CacheProvider } from '@/infrastructure/providers';
import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class HeadersMiddlware {
  private readonly applicationConfigProvider: IApplicationConfigProvider;
  private readonly cacheProvider: ICacheProvider<ClientSourceCountInput>;
  private readonly sourceOfAllowedClients: string[] =
    process.env.CLIENT_SOURCE_ALLOWED?.split(',') || [];

  constructor(
    applicationConfigProvider: ApplicationConfigProvider,
    cacheProvider: CacheProvider<ClientSourceCountInput>,
  ) {
    this.applicationConfigProvider = applicationConfigProvider;
    this.cacheProvider = cacheProvider;
  }

  private async updateCacheClientSource(newClientSource: ClientSourceCountInput): Promise<void> {
    const clientSource = await this.cacheProvider.get(strings.clientSource, {});

    let data: ClientSourceCountInput[] = [];

    if (!clientSource) {
      data.push(newClientSource);
    } else {
      data = clientSource as ClientSourceCountInput[];
      data.push(newClientSource);
    }
    await this.cacheProvider.create(strings.clientSource, {}, data, { EX: 60 * 60 * 24 });
  }

  public handle(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const clientSource = request.headers['x-client-source'];

      if (!clientSource || !this.sourceOfAllowedClients.includes(clientSource.toString())) {
        throw new ForbiddenError(strings.clientIdentifierError + strings.urlDocs);
      }

      const data: ClientSourceCountInput = {
        clientSource: clientSource?.toString(),
        timestamp: new Date().toISOString(),
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
