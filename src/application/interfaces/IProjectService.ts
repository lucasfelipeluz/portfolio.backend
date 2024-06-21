import Project from '@/domain/entities/Project';
import ProjectModel from '@/infrastructure/models/ProjectModel';
import { WhereOptions } from 'sequelize';

interface IProjectService {
  getAll(filter?: WhereOptions<ProjectModel>): Promise<Project[]>;
  getOne(filter?: WhereOptions<ProjectModel>): Promise<Project | null>;
  getById(id: number): Promise<Project | null>;
  create(entity: Project): Promise<Project>;
  update(entity: Project, filter: WhereOptions<ProjectModel>): Promise<Project>;
  delete(id: number): Promise<boolean>;
}

export default IProjectService;
