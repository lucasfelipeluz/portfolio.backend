import Entity from './Entity';
import Project from './Project';

class Skill extends Entity {
  public title: string;
  public description: string;
  public startedAt: Date;
  public icon: string;
  public color: string;
  public viewPriority: number;

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
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.title = title;
    this.description = description;
    this.startedAt = startedAt;
    this.icon = icon;
    this.color = color;
    this.viewPriority = viewPriority;
    this.projects = projects ?? [];
  }
}

export default Skill;
