import Entity from './Entity';
import ProjectImage from './ProjectImage';
import Skill from './Skill';

class Project extends Entity {
  public title: string;
  public description: string;
  public urlWebsite: string;
  public urlGithub: string;
  public viewPriority: number;
  public startedAt: Date;
  public finishedAt: Date | null;

  public readonly skills: Skill[] = [];
  public readonly images: ProjectImage[] = [];

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
    images?: ProjectImage[] | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.title = title;
    this.description = description;
    this.urlWebsite = urlWebsite;
    this.urlGithub = urlGithub;
    this.viewPriority = viewPriority;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.skills = skills ?? [];
    this.images = images ?? [];
  }
}

export default Project;
