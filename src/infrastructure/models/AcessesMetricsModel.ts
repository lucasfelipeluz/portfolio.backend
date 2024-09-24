import { AcessMetrics } from '@/domain/entities';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';
import { strings } from '@/core/utils';
import UserModel from './UserModel';

class AcessMetricsModel extends Model<AcessMetrics> {
  declare id: number;
  declare route: string;
  declare date: Date;
  declare idUser: string;

  declare readonly user: UserModel | null;
}

AcessMetricsModel.init(
  attributes.acessMetrics,
  options.generateDefaultOptions(strings.acessMetrics, false, false),
);

export default AcessMetricsModel;
