import SkillModel from '@/infrastructure/models/SkillModel';
import SkillDto from '@application/dtos/SkillDto';
import { WhereOptions } from 'sequelize';
import CreateSkillDto from '../dtos/CreateSkillDto';
import UpdateSkillDto from '../dtos/UpdateSkillDto';

interface ISkillService {
  getAll(filter?: WhereOptions<SkillModel>): Promise<SkillDto[]>;
  getOne(filter?: WhereOptions<SkillModel>): Promise<SkillDto | null>;
  getById(id: number): Promise<SkillDto | null>;
  create(entity: CreateSkillDto): Promise<SkillDto>;
  update(entity: UpdateSkillDto, filter: WhereOptions<SkillModel>): Promise<SkillDto>;
  delete(id: number): Promise<boolean>;
}

export default ISkillService;
