import { ServiceFilter } from '@/core/types';
import { AcessMetricsDto } from '../dtos';

interface IAcessMetricsService {
  getAll(filter?: ServiceFilter<AcessMetricsDto>): Promise<AcessMetricsDto[]>;
  getUserAcessMetrics(idUser: string): Promise<AcessMetricsDto[]>;
}

export default IAcessMetricsService;
