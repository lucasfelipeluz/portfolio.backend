import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/application/dtos';
import { ProjectModel } from '@/infrastructure/models';
import { WhereOptions } from 'sequelize';

interface IProjectService {
  getAll(filter?: WhereOptions<ProjectModel>): Promise<ProjectDto[]>;
  getOne(filter?: WhereOptions<ProjectModel>): Promise<ProjectDto | null>;
  getById(id: number): Promise<ProjectDto | null>;
  create(entity: CreateProjectDto): Promise<ProjectDto>;
  update(entity: UpdateProjectDto, filter: WhereOptions<ProjectModel>): Promise<ProjectDto>;
  delete(id: number): Promise<boolean>;
}

export default IProjectService;
