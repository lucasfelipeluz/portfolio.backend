import { filter, httpResponses } from '@/api/utils';
import { IAcessMetricsService } from '@/application/interfaces';
import { AcessMetricsService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AcessMetricsController {
  private readonly acessMetricsService: IAcessMetricsService;

  constructor(acessMetricsService: AcessMetricsService) {
    this.acessMetricsService = acessMetricsService;
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const filters = filter.acessMetricsFilter(request.query);

      const entities = await this.acessMetricsService.getAll(filters);

      return httpResponses.ok(response, entities);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default AcessMetricsController;
