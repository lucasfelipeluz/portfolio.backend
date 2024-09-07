import { filter, httpResponses } from '@/api/utils';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/application/dtos';
import { ProjectService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { UpdateServiceOptions } from '@/core/types';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class ProjectController {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const filters = filter.projectFilter(request.query);

      const entities = await this.projectService.getAll(filters);

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

      const entity = await this.projectService.getById(Number(id));

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
        idSkills,
      );

      const filter: UpdateServiceOptions<ProjectDto> = {
        where: {
          id: Number(id),
        },
      };

      const entity = await this.projectService.update(newEntity, filter);

      return httpResponses.ok(response, entity, strings.projectIsUpdated);
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

      const isDeleted = await this.projectService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.projectNotFound);
      }

      return httpResponses.ok(response, null, strings.projectIsDeleted);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default ProjectController;
