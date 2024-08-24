import { AcessMetrics } from '@/domain/entities';
import { BulkCreateOptions } from 'sequelize';
import IBaseRepository from './IBaseRepository';

interface IAcessMetricsRepository extends IBaseRepository<AcessMetrics> {
  bulkCreate(entity: AcessMetrics[], options?: BulkCreateOptions): Promise<AcessMetrics[]>;
}

export default IAcessMetricsRepository;
