import { strings } from '@/core/utils';
import { Suggestion } from '@/domain/entities';
import {
  IBaseRepository,
  ICacheProvider,
  ISuggestionRepository,
} from '@/infrastructure/interfaces';
import { SuggestionModel } from '@/infrastructure/models';
import { CacheProvider } from '@/infrastructure/providers';
import { FindOptions, UpdateOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class SuggestionRepository implements IBaseRepository<Suggestion>, ISuggestionRepository {
  private readonly cacheProvider: ICacheProvider<Suggestion>;

  constructor(cacheProvider: CacheProvider<Suggestion>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options?: FindOptions): Promise<Suggestion[]> {
    const cache = await this.cacheProvider.get(strings.suggestion, options ?? {});

    if (cache) {
      return cache as Suggestion[];
    }

    const result = await SuggestionModel.findAll({ ...options });

    if (result.length < 1) {
      return [] as Suggestion[];
    }

    await this.cacheProvider.create(strings.suggestion, options ?? {}, result);

    return result as Suggestion[];
  }

  async getOne(options: FindOptions): Promise<Suggestion | null> {
    const cache = await this.cacheProvider.get(strings.suggestion, options ?? {});

    if (cache) {
      return cache as Suggestion;
    }

    const result = await SuggestionModel.findOne({ ...options });

    if (result) {
      await this.cacheProvider.create(strings.suggestion, options ?? {}, result);
    }

    return result as Suggestion;
  }

  async getById(id: number): Promise<Suggestion | null> {
    const cache = await this.cacheProvider.get(strings.suggestion, { where: { id } });

    if (cache) {
      return cache as Suggestion;
    }

    const result = await SuggestionModel.findOne({
      where: {
        id: id,
      },
    });

    if (result) {
      await this.cacheProvider.create(strings.suggestion, { where: { id } }, result);
    }

    return result as Suggestion;
  }

  async create(entity: Suggestion): Promise<Suggestion> {
    const result = await SuggestionModel.create(entity);

    await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

    return result as Suggestion;
  }

  async update(entity: Suggestion, options: UpdateOptions): Promise<boolean> {
    const result = await SuggestionModel.update(entity, options);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

    return true;
  }

  async delete(options: UpdateOptions): Promise<boolean> {
    const result = await SuggestionModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

      return true;
    }

    return false;
  }
}

export default SuggestionRepository;
