import { AcessMetrics } from '@/domain/entities';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';
import { strings } from '@/core/utils';

class AcessMetricsModel extends Model<AcessMetrics> {
  declare id: number;
  declare clientSource: string;
  declare date: Date;
}

AcessMetricsModel.init(
  attributes.acessMetrics,
  options.generateDefaultOptions(strings.acessMetrics, false, false),
);

export default AcessMetricsModel;
