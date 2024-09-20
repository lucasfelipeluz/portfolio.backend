import { filter, httpResponses } from '@/api/utils';
import {
  IAboutMeService,
  IExperienceService,
  IProjectService,
  ISkillService,
} from '@/application/interfaces';
import {
  AboutMeService,
  ExperienceService,
  ProjectService,
  SkillService,
} from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import * as docs from '../docs/postman-collection.json';

@autoInjectable()
class HomeController {
  private readonly projectService: IProjectService;
  private readonly skillService: ISkillService;
  private readonly aboutMeService: IAboutMeService;
  private readonly experienceService: IExperienceService;

  constructor(
    projectService: ProjectService,
    skillService: SkillService,
    aboutMeService: AboutMeService,
    experienceService: ExperienceService,
  ) {
    this.projectService = projectService;
    this.skillService = skillService;
    this.aboutMeService = aboutMeService;
    this.experienceService = experienceService;
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const projectFilter = filter.projectFilter(request.query);
      const skillFilter = filter.skillFilter(request.query);

      projectFilter.isActive = true;
      skillFilter.isActive = true;

      const projects = await this.projectService.getAll(projectFilter);
      const skills = await this.skillService.getAll(skillFilter);
      // const aboutMe = await this.aboutMeService.get();
      const experiences = await this.experienceService.getAll({});

      return httpResponses.ok(response, { projects, skills, experiences });
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getProject(request: Request, response: Response): Promise<Response> {
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

  async getSkill(request: Request, response: Response): Promise<Response> {
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

  async getExperience(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      const skill = await this.experienceService.getById(parseInt(id, 10));

      return httpResponses.ok(response, skill);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getDocs(request: Request, response: Response): Promise<Response> {
    return httpResponses.ok(response, {
      postmanCollectionLink: strings.postmanCollectionLink,
      postmanCollectionJson: docs,
    });
  }
}

export default HomeController;
