import ProjectModel from '@/infrastructure/models/ProjectModel';
import { WhereOptions } from 'sequelize';
import CreateProjectDto from '../dtos/CreateProjectDto';
import ProjectDto from '../dtos/ProjectDto';
import UpdateProjectDto from '../dtos/UpdateProjectDto';

interface IProjectService {
  getAll(filter?: WhereOptions<ProjectModel>): Promise<ProjectDto[]>;
  getOne(filter?: WhereOptions<ProjectModel>): Promise<ProjectDto | null>;
  getById(id: number): Promise<ProjectDto | null>;
  create(entity: CreateProjectDto): Promise<ProjectDto>;
  update(entity: UpdateProjectDto, filter: WhereOptions<ProjectModel>): Promise<ProjectDto>;
  delete(id: number): Promise<boolean>;
}

export default IProjectService;
