import Project from './Project';

class Skill {
  public id: number;
  public title: string;
  public description: string;
  public startedAt: Date;
  public icon: string;
  public color: string;
  public viewPriority: number;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public readonly projects: Project[] = [];

  constructor(
    id: number,
    title: string,
    description: string,
    startedAt: Date,
    icon: string,
    color: string,
    viewPriority: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    projects?: Project[] | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startedAt = startedAt;
    this.icon = icon;
    this.color = color;
    this.viewPriority = viewPriority;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.projects = projects ?? [];
  }
}

export default Skill;
