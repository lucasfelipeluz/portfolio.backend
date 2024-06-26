import Skill from './Skill';

class Project {
  public id: number;
  public title: string;
  public description: string;
  public urlWebsite: string;
  public urlGithub: string;
  public viewPriority: number;
  public startedAt: Date;
  public finishedAt: Date | null;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public readonly skills: Skill[] = [];

  constructor(
    id: number,
    title: string,
    description: string,
    urlWebsite: string,
    urlGithub: string,
    viewPriority: number,
    startedAt: Date,
    finishedAt: Date | null,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    skills?: Skill[] | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.urlWebsite = urlWebsite;
    this.urlGithub = urlGithub;
    this.viewPriority = viewPriority;
    this.startedAt = startedAt;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.finishedAt = finishedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.skills = skills ?? [];
  }
}

export default Project;
