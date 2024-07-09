import { Project } from '@/domain/entities';
import { Model } from 'sequelize';
import { ProjectImageModel, SkillModel } from '.';
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

  declare skills: SkillModel[];

  declare images: ProjectImageModel[];
}

ProjectModel.init(attributes.project, options.project);

export default ProjectModel;
