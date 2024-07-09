import { ProjectSkill } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';
import { BulkCreateOptions } from 'sequelize';

interface IProjectSkillRepository extends IBaseRepository<ProjectSkill> {
  bulkCreate(entity: ProjectSkill[], options?: BulkCreateOptions): Promise<ProjectSkill[]>;
}

export default IProjectSkillRepository;
