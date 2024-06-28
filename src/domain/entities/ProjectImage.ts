import Project from './Project';

class ProjectImage {
  public id: number;
  public path: string;
  public viewPriority: number;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idProject: number;

  public readonly project: Project | null;

  constructor(
    id: number,
    path: string,
    viewPriority: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idProject: number,
    project: Project | null,
  ) {
    this.id = id;
    this.path = path;
    this.viewPriority = viewPriority;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.idProject = idProject;
    this.project = project;
  }
}

export default ProjectImage;
