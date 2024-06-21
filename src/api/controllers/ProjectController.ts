import ProjectService from '@/application/services/ProjectService';
import Project from '@/domain/entities/Project';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import { autoInjectable } from 'tsyringe';
import IProjectController from '../interfaces/IProjectController';

@autoInjectable()
class ProjectController implements IProjectController {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const projects = await this.projectService.getAll();

      return response.status(200).send(projects);
    } catch (error: any) {
      console.log(error);
      return response.status(error.code || 500).send(error.message);
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const projects = await this.projectService.getById(Number(id));

      return response.status(200).send(projects);
    } catch (error: any) {
      console.log(error);
      return response.status(error.code || 500).send(error.message);
    }
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, urlWebsite, urlGithub, viewPriority, startedAt, finishedAt } =
        request.body;

      const newProject: Project = new Project(
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

      const projects = await this.projectService.create(newProject);

      return response.status(200).send(projects);
    } catch (error: any) {
      console.log(error);
      return response.status(error.code || 500).send(error.message);
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, urlWebsite, urlGithub, viewPriority, startedAt, finishedAt } =
        request.body;

      const { id } = request.params;

      const newProject: Project = new Project(
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

      const projects = await this.projectService.update(newProject, filter);

      return response.status(200).send(projects);
    } catch (error: any) {
      console.log(error);
      return response.status(error.code || 500).send(error.message);
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const projects = await this.projectService.delete(Number(id));

      return response.status(200).send(projects);
    } catch (error: any) {
      console.log(error);
      return response.status(error.code || 500).send(error.message);
    }
  }
}

export default ProjectController;
