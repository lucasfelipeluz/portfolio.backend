import Skill from '@/domain/entities/Skill';
import { Model } from 'sequelize';
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

  static domainToModel(skill: Skill): SkillModel {
    return new SkillModel(skill);
  }

  toEntity(): Skill {
    return new Skill(
      this.id,
      this.title,
      this.description,
      this.startedAt,
      this.icon,
      this.color,
      this.viewPriority,
      this.isActive,
      this.createdAt,
      this.updatedAt ?? null,
      this.deletedAt ?? null,
    );
  }
}

SkillModel.init(attributes.skill, options.skill);

export default SkillModel;
