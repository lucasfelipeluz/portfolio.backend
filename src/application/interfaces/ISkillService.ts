import Skill from '@/domain/entities/Skill';
import SkillModel from '@/infrastructure/models/SkillModel';
import { WhereOptions } from 'sequelize';

interface ISkillService {
  getAll(filter?: WhereOptions<SkillModel>): Promise<Skill[]>;
  getOne(filter?: WhereOptions<SkillModel>): Promise<Skill | null>;
  getById(id: number): Promise<Skill | null>;
  create(entity: Skill): Promise<Skill>;
  update(entity: Skill, filter: WhereOptions<SkillModel>): Promise<Skill>;
  delete(id: number): Promise<boolean>;
}

export default ISkillService;
