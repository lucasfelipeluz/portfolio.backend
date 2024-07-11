import { ProjectImage } from '@/domain/entities';
import { ProjectDto } from './';

class ProjectImageDto {
  private id: number;
  private path: string;
  private viewPriority: number;

  private createdAt: Date | null;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  private idProject: number;

  private project: ProjectDto | null;

  constructor(projectImage: ProjectImage, includeProject = false) {
    this.id = projectImage.id;
    this.path = projectImage.path;
    this.viewPriority = projectImage.viewPriority;
    this.createdAt = projectImage.createdAt;
    this.updatedAt = projectImage.updatedAt;
    this.deletedAt = projectImage.deletedAt;
    this.idProject = projectImage.idProject;

    if (includeProject) {
      this.project = new ProjectDto(projectImage.project);
    } else {
      this.project = null;
    }
  }
}

export default ProjectImageDto;
