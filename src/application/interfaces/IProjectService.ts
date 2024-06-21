import Project from '@/domain/entities/Project';
import ProjectModel from '@/infrastructure/models/ProjectModel';
import { WhereOptions } from 'sequelize';

interface IProjectService {
  getAll(filter?: WhereOptions<ProjectModel>): Promise<Project[]>;
  getOne(filter?: WhereOptions<ProjectModel>): Promise<Project | null>;
  getById(id: number): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(project: Project, filter: WhereOptions<ProjectModel>): Promise<Project>;
  delete(id: number): Promise<boolean>;
}

export default IProjectService;
