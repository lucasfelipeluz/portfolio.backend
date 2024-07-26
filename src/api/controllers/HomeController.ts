import { IHomeController } from '@/api/interfaces';
import { filter, httpResponses } from '@/api/utils';
import { IProjectService, ISkillService } from '@/application/interfaces';
import { ProjectService, SkillService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class HomeController implements IHomeController {
  private projectService: IProjectService;
  private skillService: ISkillService;

  constructor(projectService: ProjectService, skillService: SkillService) {
    this.projectService = projectService;
    this.skillService = skillService;
  }

  async get(request: Request, response: Response): Promise<unknown> {
    try {
      const projectFilter = filter.projectFilter(request.query);
      const skillFilter = filter.skillFilter(request.query);

      const projects = await this.projectService.getAll(projectFilter);
      const skills = await this.skillService.getAll(skillFilter);

      return httpResponses.ok(response, { projects, skills });
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getProject(request: Request, response: Response): Promise<unknown> {
    try {
      const id = request.params.id;

      const project = await this.projectService.getById(parseInt(id, 10));

      return httpResponses.ok(response, project);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getSkill(request: Request, response: Response): Promise<unknown> {
    try {
      const id = request.params.id;

      const skill = await this.skillService.getById(parseInt(id, 10));

      return httpResponses.ok(response, skill);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default HomeController;
