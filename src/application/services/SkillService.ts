import Skill from '@/domain/entities/Skill';
import SkillModel from '@/infrastructure/models/SkillModel';
import SkillRepository from '@/infrastructure/repositories/SkillRepository';
import { FindOptions, UpdateOptions, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import ISkillService from '../interfaces/ISkillService';

@injectable()
class SkillService implements ISkillService {
  private readonly skillRepository: SkillRepository;

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository;
  }

  async getAll(filter?: WhereOptions): Promise<Skill[]> {
    const options: FindOptions = {
      where: filter,
    };

    return await this.skillRepository.getAll(options);
  }

  async getOne(filter?: WhereOptions<SkillModel> | undefined): Promise<Skill | null> {
    const options: FindOptions = {
      where: filter,
    };

    return await this.skillRepository.getOne(options);
  }

  async getById(id: number): Promise<Skill | null> {
    const result = await this.skillRepository.getById(id);

    return result || ({} as Skill);
  }

  async create(entity: Skill): Promise<Skill> {
    return await this.skillRepository.create(entity);
  }

  async update(entity: Skill, filter: WhereOptions<SkillModel>): Promise<Skill> {
    const options: UpdateOptions<SkillModel> = {
      where: filter,
    };

    await this.skillRepository.update(entity, options);

    return entity;
  }

  async delete(id: number): Promise<boolean> {
    const options: UpdateOptions<SkillModel> = {
      where: {
        id: id,
      },
    };

    const isDeleted = await this.skillRepository.delete(options);

    return isDeleted;
  }
}

export default SkillService;
