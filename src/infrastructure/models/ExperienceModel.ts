import { Experience } from '@/domain/entities';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';
import { strings } from '@/core/utils';

class ExperienceModel extends Model<Experience> {
  declare id: number;
  declare jobTitle: string;
  declare companyName: string;
  declare description: string;
  declare pathImage: string;
  declare startedAt: Date;
  declare finishedAt: Date | null;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;
}

ExperienceModel.init(attributes.experience, options.generateDefaultOptions(strings.experience));

export default ExperienceModel;
