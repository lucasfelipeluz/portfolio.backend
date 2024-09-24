import { IAcessMetricsService } from '@/application/interfaces';
import { ServiceFilter } from '@/core/types';
import { AcessMetricsDto } from '@/application/dtos';
import { injectable } from 'tsyringe';
import { IAcessMetricsRepository } from '@/infrastructure/interfaces';
import { AcessMetricsRepository } from '@/infrastructure/repositories';
import { AcessMetrics } from '@/domain/entities';
import { transform } from '@/core/utils';

@injectable()
class AcessMetricsService implements IAcessMetricsService {
  private readonly acessMetricsRepository: IAcessMetricsRepository;

  constructor(acessMetricsRepository: AcessMetricsRepository) {
    this.acessMetricsRepository = acessMetricsRepository;
  }

  async getAll(filter?: ServiceFilter<AcessMetricsDto>): Promise<AcessMetricsDto[]> {
    const options = transform.serviceFilterToModelFilter<AcessMetricsDto, AcessMetrics>(
      filter ?? ({} as ServiceFilter<AcessMetricsDto>),
    );

    const entities = await this.acessMetricsRepository.getAll(options);

    return entities.map((entity) => new AcessMetricsDto(entity, true));
  }

  async getUserAcessMetrics(idUser: string): Promise<AcessMetricsDto[]> {
    const filter = { isActive: true, idUser } as ServiceFilter<AcessMetricsDto>;

    const options = transform.serviceFilterToModelFilter<AcessMetricsDto, AcessMetrics>(filter);

    const entities = await this.acessMetricsRepository.getAll(options);

    return entities.map((entity) => new AcessMetricsDto(entity, true));
  }
}

export default AcessMetricsService;
