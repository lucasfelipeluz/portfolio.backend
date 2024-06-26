import CreateProjectImageDto from '@/application/dtos/CreateProjectImageDto';
import IProjectImageService from '@/application/interfaces/IProjectImageService';
import ProjectImageService from '@/application/services/ProjectImageService';
import strings from '@/domain/utils/strings';
import { Request, Response } from 'express';
import IProjectImageController from '../interfaces/IProjectImageController';
import httpResponses from '../utils/httpResponses';
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
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async updateViewPriority(request: Request, response: Response): Promise<unknown> {
    try {
      const { viewPriority } = request.body;
      const { id } = request.params;

      await this.projectImageService.updateViewPriority(Number(id), viewPriority);

      return httpResponses.ok(response, { id, viewPriority }, strings.projectImageIsUpdated);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      await this.projectImageService.delete(Number(id));

      return httpResponses.ok(response, { id }, strings.projectImageIsDeleted);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }
}

export default ProjectImageController;
