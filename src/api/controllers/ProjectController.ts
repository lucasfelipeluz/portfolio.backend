import ProjectService from '@/application/services/ProjectService';
import Project from '@/domain/entities/Project';
import strings from '@/domain/utils/strings';
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
      return httpResponses.internalServerError(response, strings.internalServerError, error);
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const entity = await this.projectService.getById(Number(id));

      return httpResponses.ok(response, entity);
    } catch (error: any) {
      return httpResponses.internalServerError(response, strings.internalServerError, error);
    }
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, urlWebsite, urlGithub, viewPriority, startedAt, finishedAt } =
        request.body;

      const newEntity: Project = new Project(
        0,
        title,
        description,
        urlWebsite,
        urlGithub,
        viewPriority,
        startedAt,
        finishedAt,
        true,
        new Date(),
        null,
        null,
      );

      const createdEntity = await this.projectService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.projectIsCreated);
    } catch (error: any) {
      return httpResponses.internalServerError(response, strings.internalServerError, error);
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, urlWebsite, urlGithub, viewPriority, startedAt, finishedAt } =
        request.body;

      const { id } = request.params;

      const newEntity: Project = new Project(
        Number(id),
        title,
        description,
        urlWebsite,
        urlGithub,
        viewPriority,
        startedAt,
        finishedAt,
        true,
        new Date(),
        null,
        null,
      );

      const filter: WhereOptions<Project> = {
        id: Number(id),
      };

      const entity = await this.projectService.update(newEntity, filter);

      return httpResponses.ok(response, entity, strings.projectIsUpdated);
    } catch (error: any) {
      return httpResponses.internalServerError(response, strings.internalServerError, error);
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
      return httpResponses.internalServerError(response, strings.internalServerError, error);
    }
  }
}

export default ProjectController;
