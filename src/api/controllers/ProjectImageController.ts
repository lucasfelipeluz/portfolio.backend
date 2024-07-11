import { IProjectImageController } from '@/api/interfaces';
import { httpResponses } from '@/api/utils';
import { CreateProjectImageDto } from '@/application/dtos';
import { IProjectImageService } from '@/application/interfaces';
import { ProjectImageService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class ProjectImageController implements IProjectImageController {
  private readonly projectImageService: IProjectImageService;

  constructor(projectImageService: ProjectImageService) {
    this.projectImageService = projectImageService;
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const { path, viewPriority, projectId } = request.body;

      const newEntity = new CreateProjectImageDto(path, viewPriority, projectId);

      const createdEntity = await this.projectImageService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.projectImageIsCreated);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async updateViewPriority(request: Request, response: Response): Promise<unknown> {
    try {
      const { viewPriority } = request.body;
      const { id } = request.params;

      await this.projectImageService.updateViewPriority(Number(id), viewPriority);

      return httpResponses.ok(response, { id, viewPriority }, strings.projectImageIsUpdated);
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

      await this.projectImageService.delete(Number(id));

      return httpResponses.ok(response, { id }, strings.projectImageIsDeleted);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default ProjectImageController;
