import { Skill } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface ISkillRepository extends IBaseRepository<Skill> {}

export default ISkillRepository;
