import Entity from './Entity';
import Project from './Project';

class ProjectImage extends Entity {
  public id: number;
  public path: string;
  public viewPriority: number;

  public idProject: number;

  public readonly project: Project;

  constructor(
    id: number,
    path: string,
    viewPriority: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idProject: number,
    project: Project,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.path = path;
    this.viewPriority = viewPriority;
    this.idProject = idProject;
    this.project = project;
  }
}

export default ProjectImage;
