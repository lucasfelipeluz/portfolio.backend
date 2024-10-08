import { filter, httpResponses } from '@/api/utils';
import { CreateSkillDto, SkillDto, UpdateSkillDto } from '@/application/dtos';
import { SkillService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { UpdateServiceOptions } from '@/core/types';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class SkillController {
  private readonly skillService: SkillService;

  constructor(skillService: SkillService) {
    this.skillService = skillService;
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const filters = filter.skillFilter(request.query);

      const entities = await this.skillService.getAll(filters);

      return httpResponses.ok(response, entities);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const entity = await this.skillService.getById(Number(id));

      return httpResponses.ok(response, entity);
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
      const { title, description, startedAt, icon, color, viewPriority } = request.body;

      const newEntity = new CreateSkillDto(
        title,
        description,
        startedAt,
        icon,
        color,
        viewPriority,
      );

      const createdEntity = await this.skillService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.skillIsCreated);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description, startedAt, icon, color, viewPriority } = request.body;

      const { id } = request.params;

      const newEntity = new UpdateSkillDto(
        Number(id),
        title,
        description,
        startedAt,
        icon,
        color,
        viewPriority,
      );

      const filter: UpdateServiceOptions<SkillDto> = {
        where: {
          id: Number(id),
        },
      };

      const entityUpdated = await this.skillService.update(newEntity, filter);

      return httpResponses.ok(response, entityUpdated, strings.skillIsUpdated);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const isDeleted = await this.skillService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.skillNotFound);
      }

      return httpResponses.ok(response, null, strings.skillIsDeleted);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default SkillController;
