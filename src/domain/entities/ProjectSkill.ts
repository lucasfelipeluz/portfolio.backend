import Entity from './Entity';
import Project from './Project';
import Skill from './Skill';

class ProjectSkill extends Entity {
  public id: number;
  public idSkill: number;
  public idProject: number;

  public skill: Skill;
  public project: Project;

  constructor(
    id: number,
    idSkill: number,
    idProject: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    skill: Skill,
    project: Project,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.idSkill = idSkill;
    this.idProject = idProject;
    this.skill = skill;
    this.project = project;
  }
}

export default ProjectSkill;
