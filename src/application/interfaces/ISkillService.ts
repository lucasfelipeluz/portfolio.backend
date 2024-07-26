import { CreateSkillDto, SkillDto, UpdateSkillDto } from '@/application/dtos';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';

interface ISkillService {
  getAll(filter?: ServiceFilter<SkillDto>): Promise<SkillDto[]>;
  getOne(filter?: ServiceFilter<SkillDto>): Promise<SkillDto | null>;
  getById(id: number): Promise<SkillDto | null>;
  create(entity: CreateSkillDto): Promise<SkillDto>;
  update(entity: UpdateSkillDto, filter: UpdateServiceOptions<SkillDto>): Promise<SkillDto>;
  delete(id: number): Promise<boolean>;
}

export default ISkillService;
