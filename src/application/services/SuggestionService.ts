import { CreateSuggestionDto, SuggestionDto } from '@/application/dtos';
import { ISuggestionService } from '@/application/interfaces';
import { ServiceFilter } from '@/core/types';
import { transform } from '@/core/utils';
import { Project } from '@/domain/entities';
import { ISuggestionRepository } from '@/infrastructure/interfaces';
import { SuggestionRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';

@injectable()
class SuggestionService implements ISuggestionService {
  private readonly suggestionRepository: ISuggestionRepository;

  constructor(suggestionRepository: SuggestionRepository) {
    this.suggestionRepository = suggestionRepository;
  }

  async getAll(filter?: ServiceFilter<SuggestionDto>): Promise<SuggestionDto[]> {
    const options = transform.serviceFilterToModelFilter<SuggestionDto, Project>(
      filter ?? ({} as ServiceFilter<SuggestionDto>),
    );

    const entities = await this.suggestionRepository.getAll(options);

    return entities.map((entity) => new SuggestionDto(entity));
  }

  async getById(id: number): Promise<SuggestionDto | null> {
    const entity = await this.suggestionRepository.getById(id);

    if (!entity) {
      return {} as SuggestionDto;
    }

    return new SuggestionDto(entity);
  }

  async create(newEntity: CreateSuggestionDto): Promise<SuggestionDto> {
    const entity = newEntity.toDomain();

    const entityCreated = await this.suggestionRepository.create(entity);

    return new SuggestionDto(entityCreated);
  }
}

export default SuggestionService;
