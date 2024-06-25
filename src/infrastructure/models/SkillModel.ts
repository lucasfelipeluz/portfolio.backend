import Skill from '@/domain/entities/Skill';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';
import Project from '@/domain/entities/Project';

class SkillModel extends Model<Skill> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare startedAt: Date;
  declare icon: string;
  declare color: string;
  declare viewPriority: number;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare projects: Project[];
}

SkillModel.init(attributes.skill, options.skill);

export default SkillModel;
