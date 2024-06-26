import SkillService from '@/application/services/SkillService';
import Skill from '@/domain/entities/Skill';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import { autoInjectable } from 'tsyringe';
import ISkillController from '../interfaces/ISkillController';
import strings from '@/domain/utils/strings';
import httpResponses from '../utils/httpResponses';
import CreateSkillDto from '@/application/dtos/CreateSkillDto';
import UpdateSkillDto from '@/application/dtos/UpdateSkillDto';

@autoInjectable()
class SkillController implements ISkillController {
  private readonly skillService: SkillService;

  constructor(skillService: SkillService) {
    this.skillService = skillService;
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const entities = await this.skillService.getAll();

      return httpResponses.ok(response, entities);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const entity = await this.skillService.getById(Number(id));

      return httpResponses.ok(response, entity);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async create(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, startedAt, icon, color, viewPriority } = request.body;

      const newEntity = new CreateSkillDto(
        title,
        description,
        startedAt,
        icon,
        color,
        viewPriority,
      );

      const createdEntity = await this.skillService.create(newEntity);

      return httpResponses.created(response, createdEntity, strings.skillIsCreated);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const { title, description, startedAt, icon, color, viewPriority } = request.body;

      const { id } = request.params;

      const newEntity = new UpdateSkillDto(
        Number(id),
        title,
        description,
        startedAt,
        icon,
        color,
        viewPriority,
      );

      const filter: WhereOptions<Skill> = {
        id: Number(id),
      };

      const entityUpdated = await this.skillService.update(newEntity, filter);

      return httpResponses.ok(response, entityUpdated, strings.skillIsUpdated);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    try {
      const { id } = request.params;

      const isDeleted = await this.skillService.delete(Number(id));

      if (!isDeleted) {
        return httpResponses.badRequest(response, strings.skillNotFound);
      }

      return httpResponses.ok(response, null, strings.skillIsDeleted);
    } catch (error: any) {
      return httpResponses.handleServerError(response, strings.internalServerError, error);
    }
  }
}

export default SkillController;
