import { Project } from '@/domain/entities';
import { ProjectImageDto, SkillDto } from './';

class ProjectDto {
  public id: number | null;
  public title: string;
  public description: string;
  public urlWebsite: string;
  public urlGithub: string;
  public viewPriority: number;
  public startedAt: Date;
  public finishedAt: Date | null;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public skills: SkillDto[] | null;
  public images: ProjectImageDto[] | null;

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
