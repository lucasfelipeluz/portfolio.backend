import Project from '@domain/entities/Project';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';

class ProjectModel extends Model<Project> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare urlWebsite: string;
  declare urlGithub: string;
  declare viewPriority: number;
  declare startedAt: Date;
  declare finishedAt: Date | null;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  static domainToModel(project: Project): ProjectModel {
    return new ProjectModel(project);
  }

  toEntity(): Project {
    return new Project(
      this.id,
      this.title,
      this.description,
      this.urlWebsite,
      this.urlGithub,
      this.viewPriority,
      this.startedAt,
      this.finishedAt ?? null,
      this.isActive,
      this.createdAt,
      this.updatedAt ?? null,
      this.deletedAt ?? null,
    );
  }
}

ProjectModel.init(attributes.project, options.project);

export default ProjectModel;
