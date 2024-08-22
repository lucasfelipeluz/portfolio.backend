import { httpResponses } from '@/api/utils';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '@/application/dtos';
import { IExperienceService } from '@/application/interfaces';
import { ExperienceService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { UpdateServiceOptions } from '@/core/types';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { IExperienceController } from '../interfaces';

@autoInjectable()
class ExperienceController implements IExperienceController {
  private readonly experienceService: IExperienceService;

  constructor(experienceService: ExperienceService) {
    this.experienceService = experienceService;
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      // const filters = filter.projectFilter(request.query);

      const entities = await this.experienceService.getAll({});

      return httpResponses.ok(response, entities);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const entity = await this.experienceService.getById(Number(id));

      return httpResponses.ok(response, entity);
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
      const { jobTitle, companyName, description, startedAt, finishedAt, base64PathImage } =
        request.body;

      const newEntity = new CreateExperienceDto(
        jobTitle,
        companyName,
        description,
        startedAt,
        base64PathImage,
        finishedAt,
      );

      const createdEntity = await this.experienceService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.experienceIsCreated);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const { jobTitle, companyName, description, startedAt, finishedAt, base64PathImage } =
        request.body;

      const { id } = request.params;

      const newEntity = new UpdateExperienceDto(
        Number(id),
        jobTitle,
        companyName,
        description,
        startedAt,
        base64PathImage,
        finishedAt,
      );

      const filter: UpdateServiceOptions<ExperienceDto> = {
        where: {
          id: Number(id),
        },
      };

      const entity = await this.experienceService.update(newEntity, filter);

      return httpResponses.ok(response, entity, strings.experienceIsUpdated);
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

      const isDeleted = await this.experienceService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.experienceNotFound);
      }

      return httpResponses.ok(response, null, strings.experienceIsDeleted);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default ExperienceController;
