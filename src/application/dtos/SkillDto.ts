import { Skill } from '@/domain/entities';
import { ProjectDto } from './';

class SkillDto {
  private id: number | null;
  private title: string;
  private description: string;
  private startedAt: Date;
  private icon: string;
  private color: string;
  private viewPriority: number;
  private createdAt: Date | null;

  private projects: ProjectDto[] | null;

  constructor(skill: Skill, includeProjects: boolean = false) {
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
