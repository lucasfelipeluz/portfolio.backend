import { CreateSkillDto, SkillDto, UpdateSkillDto } from '@/application/dtos';
import { SkillModel } from '@/infrastructure/models';
import { WhereOptions } from 'sequelize';

interface ISkillService {
  getAll(filter?: WhereOptions<SkillModel>): Promise<SkillDto[]>;
  getOne(filter?: WhereOptions<SkillModel>): Promise<SkillDto | null>;
  getById(id: number): Promise<SkillDto | null>;
  create(entity: CreateSkillDto): Promise<SkillDto>;
  update(entity: UpdateSkillDto, filter: WhereOptions<SkillModel>): Promise<SkillDto>;
  delete(id: number): Promise<boolean>;
}

export default ISkillService;
