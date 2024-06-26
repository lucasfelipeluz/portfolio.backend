import CreateProjectDto from '@/application/dtos/CreateProjectDto';
import UpdateProjectDto from '@/application/dtos/UpdateProjectDto';
import ProjectService from '@/application/services/ProjectService';
import strings from '@/domain/utils/strings';
import ProjectModel from '@/infrastructure/models/ProjectModel';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import { autoInjectable } from 'tsyringe';
import IProjectController from '../interfaces/IProjectController';
import httpResponses from '../utils/httpResponses';

@autoInjectable()
class ProjectController implements IProjectController {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const entities = await this.projectService.getAll();

      return httpResponses.ok(response, entities);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const entity = await this.projectService.getById(Number(id));

      return httpResponses.ok(response, entity);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const {
        title,
        description,
        urlWebsite,
        urlGithub,
        viewPriority,
        startedAt,
        finishedAt,
        idSkills,
      } = request.body;

      const newEntity = new CreateProjectDto(
        title,
        description,
        urlWebsite,
        urlGithub,
        viewPriority,
        startedAt,
        finishedAt,
        idSkills,
      );

      const createdEntity = await this.projectService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.projectIsCreated);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, urlWebsite, urlGithub, viewPriority, startedAt, finishedAt } =
        request.body;

      const { id } = request.params;

      const newEntity = new UpdateProjectDto(
        Number(id),
        title,
        description,
        urlWebsite,
        urlGithub,
        viewPriority,
        startedAt,
        finishedAt,
      );

      const filter: WhereOptions<ProjectModel> = {
        id: Number(id),
      };

      const entity = await this.projectService.update(newEntity, filter);

      return httpResponses.ok(response, entity, strings.projectIsUpdated);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const isDeleted = await this.projectService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.projectNotFound);
      }

      return httpResponses.ok(response, null, strings.projectIsDeleted);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }
}

export default ProjectController;
