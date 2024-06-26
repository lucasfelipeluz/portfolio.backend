import ProjectSkill from '@/domain/entities/ProjectSkill';
import { Model } from 'sequelize';
import ProjectModel from './ProjectModel';
import SkillModel from './SkillModel';
import attributes from './addons/attributes';
import options from './addons/options';

class ProjectSkillModel extends Model<ProjectSkill> {
  declare id: number;
  declare idSkill: number;
  declare idProject: number;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare skill: SkillModel;
  declare project: ProjectModel;
}

ProjectSkillModel.init(attributes.projectSkill, options.projectSkill);

export default ProjectSkillModel;
