import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { Suggestion } from '@/domain/entities';
import {
  IBaseRepository,
  ICacheProvider,
  ISuggestionRepository,
} from '@/infrastructure/interfaces';
import { SuggestionModel } from '@/infrastructure/models';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class SuggestionRepository implements IBaseRepository<Suggestion>, ISuggestionRepository {
  private readonly cacheProvider: ICacheProvider<Suggestion>;

  constructor(cacheProvider: CacheProvider<Suggestion>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<Suggestion>): Promise<Suggestion[]> {
    const cache = await this.cacheProvider.get(strings.suggestion, options);

    if (cache) {
      return cache as Suggestion[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SuggestionModel.findAll(findOptions);

    if (result.length < 1) {
      return [] as Suggestion[];
    }

    await this.cacheProvider.create(strings.suggestion, options, result);

    return result as Suggestion[];
  }

  async getOne(options: ApplicationFilter<Suggestion>): Promise<Suggestion | null> {
    const cache = await this.cacheProvider.get(strings.suggestion, options);

    if (cache) {
      return cache as Suggestion;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await SuggestionModel.findOne(findOptions);

    if (result) {
      await this.cacheProvider.create(strings.suggestion, options, result);
    }

    return result as Suggestion;
  }

  async create(entity: Suggestion, options: ApplicationEntityCreatingOptions): Promise<Suggestion> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await SuggestionModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

    return result as Suggestion;
  }

  async update(
    entity: Suggestion,
    options: ApplicationEntityUpdatingOptions<Suggestion>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await SuggestionModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<Suggestion>): Promise<boolean> {
    const deleteOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await SuggestionModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      deleteOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWith(strings.suggestion);

      return true;
    }

    return false;
  }
}

export default SuggestionRepository;
