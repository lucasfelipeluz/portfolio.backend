import CreateProjectImageDto from '../dtos/CreateProjectImageDto';
import ProjectImageDto from '../dtos/ProjectImageDto';

interface IProjectImageService {
  create(entity: CreateProjectImageDto): Promise<ProjectImageDto>;
  updateViewPriority(id: number, viewPriority: number): Promise<ProjectImageDto>;
  delete(id: number): Promise<boolean>;
}

export default IProjectImageService;
