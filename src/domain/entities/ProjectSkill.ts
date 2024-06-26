import Project from './Project';
import Skill from './Skill';

class ProjectSkill {
  public id: number;
  public idSkill: number;
  public idProject: number;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

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
    this.id = id;
    this.idSkill = idSkill;
    this.idProject = idProject;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.skill = skill;
    this.project = project;
  }
}

export default ProjectSkill;
