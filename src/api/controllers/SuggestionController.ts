import { httpResponses } from '@/api/utils';
import { CreateSuggestionDto } from '@/application/dtos';
import { ISuggestionService } from '@/application/interfaces';
import { SuggestionService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class SuggestionController {
  private readonly suggestionService: ISuggestionService;

  constructor(suggestionService: SuggestionService) {
    this.suggestionService = suggestionService;
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const entities = await this.suggestionService.getAll();

      return httpResponses.ok(response, entities);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { text } = request.body;

      const entity = new CreateSuggestionDto(text);

      const newEntity = await this.suggestionService.create(entity);

      return httpResponses.ok(response, newEntity);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default SuggestionController;
