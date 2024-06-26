import Skill from '@/domain/entities/Skill';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import IBaseRepository from '../interfaces/IBaseRepository';
import ISkillRepository from '../interfaces/ISkillRepository';
import SkillModel from '../models/SkillModel';
import includes from '../models/addons/relationships';

@injectable()
class SkillRepository implements IBaseRepository<Skill>, ISkillRepository {
  async getAll(options: FindOptions<any>): Promise<Skill[]> {
    const result = await SkillModel.findAll({
      ...options,
      include: includes.skill,
    });

    if (result.length < 1) {
      return [] as Skill[];
    }

    return result as Skill[];
  }

  async getOne(options: FindOptions<any>): Promise<Skill | null> {
    const result = await SkillModel.findOne({ ...options, include: includes.skill });

    return result as Skill;
  }

  async getById(id: number): Promise<Skill | null> {
    const result = await SkillModel.findOne({
      where: {
        id: id,
      },
      include: includes.skill,
    });

    return result as Skill;
  }

  async create(entity: Skill): Promise<Skill> {
    const result = await SkillModel.create(entity);

    return result as Skill;
  }

  async update(entity: Skill, options: UpdateOptions<any>): Promise<boolean> {
    const result = await SkillModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    return true;
  }
  async delete(options: UpdateOptions<any>): Promise<boolean> {
    const result = await SkillModel.update(
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

export default SkillRepository;
