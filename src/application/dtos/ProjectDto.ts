import Project from '@/domain/entities/Project';
import SkillDto from './SkillDto';
import ProjectImageDto from './ProjectImageDto';

class ProjectDto {
  private id: number | null;
  private title: string;
  private description: string;
  private urlWebsite: string;
  private urlGithub: string;
  private viewPriority: number;
  private startedAt: Date;
  private finishedAt: Date | null;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  private skills: SkillDto[] | null;
  private images: ProjectImageDto[] | null;

  constructor(project: Project, include?: boolean) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    this.urlWebsite = project.urlWebsite;
    this.urlGithub = project.urlGithub;
    this.viewPriority = project.viewPriority;
    this.startedAt = project.startedAt;
    this.finishedAt = project.finishedAt;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
    this.deletedAt = project.deletedAt;
    if (include) {
      this.skills = project.skills.map((skill) => new SkillDto(skill));
      this.images = project.images.map((image) => new ProjectImageDto(image));
    } else {
      this.skills = null;
      this.images = null;
    }
  }
}

export default ProjectDto;
