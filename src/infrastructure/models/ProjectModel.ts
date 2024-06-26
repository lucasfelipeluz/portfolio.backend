import Skill from '@/domain/entities/Skill';
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

  declare skills: Skill[] | null;
}

ProjectModel.init(attributes.project, options.project);

export default ProjectModel;
