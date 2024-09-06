import { strings } from '@/core/utils';
import { Suggestion } from '@/domain/entities';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';

class SuggestionModel extends Model<Suggestion> {
  declare id: number;
  declare text: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;
}

SuggestionModel.init(attributes.suggestion, options.generateDefaultOptions(strings.suggestion));

export default SuggestionModel;
