import { IHomeController } from '@/api/interfaces';
import { httpResponses } from '@/api/utils';
import { IProjectService, ISkillService } from '@/application/interfaces';
import { ProjectService, SkillService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
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
      const filter: WhereOptions = {
        isActive: true,
      };

      const projects = await this.projectService.getAll(filter);
      const skills = await this.skillService.getAll(filter);

      return httpResponses.ok(response, { projects, skills });
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
