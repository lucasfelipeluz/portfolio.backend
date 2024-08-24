import { NotImplementedError } from '@/core/errors';
import { strings } from '@/core/utils';
import { AcessMetrics } from '@/domain/entities';
import { FindOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import { IAcessMetricsRepository, IBaseRepository, ICacheProvider } from '../interfaces';
import { AcessMetricsModel } from '../models';
import { CacheProvider } from '../providers';

@injectable()
class AcessMetricsRepository implements IBaseRepository<AcessMetrics>, IAcessMetricsRepository {
  private readonly cacheProvider: ICacheProvider<AcessMetrics>;

  constructor(cacheRepository: CacheProvider<AcessMetrics>) {
    this.cacheProvider = cacheRepository;
  }

  async getAll(options: FindOptions): Promise<AcessMetrics[]> {
    const cache = await this.cacheProvider.get(strings.acessMetrics, options ?? {});

    if (cache) {
      return cache as AcessMetrics[];
    }

    const result = await AcessMetricsModel.findAll();

    if (result.length < 1) {
      return [] as AcessMetrics[];
    }

    await this.cacheProvider.create(strings.acessMetrics, options ?? {}, result);

    return result as AcessMetrics[];
  }

  async getOne(options: FindOptions): Promise<AcessMetrics | null> {
    const cache = await this.cacheProvider.get(strings.acessMetrics, options ?? {});

    if (cache) {
      return cache as AcessMetrics;
    }

    const result = await AcessMetricsModel.findOne({
      ...options,
    });

    if (result) {
      await this.cacheProvider.create(strings.acessMetrics, options ?? {}, result);
    }

    return result as AcessMetrics;
  }

  async getById(id: number): Promise<AcessMetrics | null> {
    const cache = await this.cacheProvider.get(strings.acessMetrics, { where: { id } });

    if (cache) {
      return cache as AcessMetrics;
    }

    const result = await AcessMetricsModel.findOne({
      where: {
        id: id,
      },
    });

    if (result) {
      await this.cacheProvider.create(strings.acessMetrics, { where: { id } }, result);
    }

    return result as AcessMetrics;
  }

  async create(entity: AcessMetrics): Promise<AcessMetrics> {
    const result = await AcessMetricsModel.create(entity);

    await this.cacheProvider.clearWhenStartingWith(strings.acessMetrics);

    return result as AcessMetrics;
  }

  async bulkCreate(entity: AcessMetrics[]): Promise<AcessMetrics[]> {
    const result = await AcessMetricsModel.bulkCreate(entity);

    await this.cacheProvider.clearWhenStartingWith(strings.acessMetrics);

    return result as AcessMetrics[];
  }

  async update(): Promise<boolean> {
    throw new NotImplementedError(strings.notImplementedError);
  }

  async delete(): Promise<boolean> {
    throw new NotImplementedError(strings.notImplementedError);
  }
}

export default AcessMetricsRepository;
