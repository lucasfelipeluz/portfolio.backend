import { Skill } from '@/domain/entities';
import { Model } from 'sequelize';
import { ProjectModel } from '.';
import attributes from './addons/attributes';
import options from './addons/options';

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

  declare projects: ProjectModel[];
}

SkillModel.init(attributes.skill, options.skill);

export default SkillModel;
