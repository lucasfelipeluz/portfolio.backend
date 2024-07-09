import { Project } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface IProjectRepository extends IBaseRepository<Project> {}

export default IProjectRepository;
