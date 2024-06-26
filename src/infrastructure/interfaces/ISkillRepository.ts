import Skill from '@/domain/entities/Skill';
import IBaseRepository from './IBaseRepository';

interface ISkillRepository extends IBaseRepository<Skill> {}

export default ISkillRepository;
