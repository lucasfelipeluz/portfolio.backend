import ProjectSkill from '@/domain/entities/ProjectSkill';
import { BulkCreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import IBaseRepository from '../interfaces/IBaseRepository';
import IProjectSkillRepository from '../interfaces/IProjectSkillRepository';
import ProjectSkillModel from '../models/ProjectSkillModel';
import includes from '../models/addons/relationships';

@injectable()
class ProjectSkillRepository implements IBaseRepository<ProjectSkill>, IProjectSkillRepository {
  async getAll(options: FindOptions<any>): Promise<ProjectSkill[]> {
    const result = await ProjectSkillModel.findAll({
      ...options,
      include: includes.projectSkill,
    });

    if (result.length < 1) {
      return [] as ProjectSkill[];
    }

    return result as ProjectSkill[];
  }

  async getOne(options: FindOptions<any>): Promise<ProjectSkill | null> {
    const result = await ProjectSkillModel.findOne({ ...options, include: includes.projectSkill });

    return result as ProjectSkill;
  }

  async getById(id: number): Promise<ProjectSkill | null> {
    const result = await ProjectSkillModel.findOne({
      where: {
        id: id,
      },
      include: includes.projectSkill,
    });

    return result as ProjectSkill;
  }

  async create(entity: ProjectSkill): Promise<ProjectSkill> {
    const result = await ProjectSkillModel.create(entity);

    return result as ProjectSkill;
  }

  async bulkCreate(entity: ProjectSkill[], options?: BulkCreateOptions): Promise<ProjectSkill[]> {
    const result = await ProjectSkillModel.bulkCreate(entity, options);

    return result as ProjectSkill[];
  }

  async update(entity: ProjectSkill, options: UpdateOptions<any>): Promise<boolean> {
    const result = await ProjectSkillModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    return true;
  }
  async delete(options: UpdateOptions<any>): Promise<boolean> {
    const result = await ProjectSkillModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] < 1) {
      return false;
    }

    return true;
  }
}

export default ProjectSkillRepository;
