import { Skill } from '@/domain/entities';
import { ProjectDto } from './';

class SkillDto {
  public id: number | null;
  public title: string;
  public description: string;
  public startedAt: Date;
  public icon: string;
  public color: string;
  public viewPriority: number;
  public createdAt: Date | null;

  public projects: ProjectDto[] | null;

  constructor(skill: Skill, includeProjects = false) {
    this.id = skill.id;
    this.title = skill.title;
    this.description = skill.description;
    this.startedAt = skill.startedAt;
    this.icon = skill.icon;
    this.color = skill.color;
    this.viewPriority = skill.viewPriority;
    this.createdAt = skill.createdAt;

    if (includeProjects) {
      this.projects = skill.projects.map((project) => new ProjectDto(project));
    } else {
      this.projects = null;
    }
  }
}

export default SkillDto;
