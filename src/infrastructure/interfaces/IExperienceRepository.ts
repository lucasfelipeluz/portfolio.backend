import { Experience } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface IExperienceRepository extends IBaseRepository<Experience> {}

export default IExperienceRepository;
