import Project from '@/domain/entities/Project';
import SkillDto from './SkillDto';

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

  constructor(project: Project, includeSkill: boolean = false) {
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
    if (includeSkill) {
      this.skills = project.skills.map((skill) => new SkillDto(skill));
    } else {
      this.skills = null;
    }
  }
}

export default ProjectDto;
