import { httpResponses } from '@/api/utils';
import { CreateSystemVariableDto, SystemVariableDto } from '@/application/dtos';
import { ISystemVariableService } from '@/application/interfaces';
import { SystemVariableService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { ServiceFilter } from '@/core/types';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { ISystemVariableController } from '../interfaces';

@autoInjectable()
class SystemVariableController implements ISystemVariableController {
  private readonly systemVariableService: ISystemVariableService;

  constructor(systemVariableService: SystemVariableService) {
    this.systemVariableService = systemVariableService;
  }

  async get(request: Request, response: Response): Promise<unknown> {
    try {
      const { key } = request.query;

      const filters = {
        where: {},
        isActive: true,
      } as ServiceFilter<SystemVariableDto>;

      if (key) {
        filters.where = { key: key as string };
      }

      const entities = await this.systemVariableService.getAll(filters);

      return httpResponses.ok(response, entities);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const { key, value } = request.body;

      const newEntity = new CreateSystemVariableDto(key, value);

      const createdEntity = await this.systemVariableService.createOrUpdate(newEntity);

      return httpResponses.created(response, createdEntity, strings.systemVariableIsCreated);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const isDeleted = await this.systemVariableService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.systemVariableNotFound);
      }

      return httpResponses.ok(response, null, strings.systemVariableIsDeleted);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default SystemVariableController;
