import Project from '@/domain/entities/Project';
import IBaseRepository from './IBaseRepository';

interface IProjectRepository extends IBaseRepository<Project> {}

export default IProjectRepository;
