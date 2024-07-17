import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/application/dtos';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';

interface IProjectService {
  getAll(filter?: ServiceFilter<ProjectDto>): Promise<ProjectDto[]>;
  getOne(filter?: ServiceFilter<ProjectDto>): Promise<ProjectDto | null>;
  getById(id: number): Promise<ProjectDto | null>;
  create(entity: CreateProjectDto): Promise<ProjectDto>;
  update(entity: UpdateProjectDto, filter: UpdateServiceOptions<ProjectDto>): Promise<ProjectDto>;
  delete(id: number): Promise<boolean>;
}

export default IProjectService;
