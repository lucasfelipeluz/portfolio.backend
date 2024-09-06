import { ServiceFilter } from '@/core/types';
import { CreateSuggestionDto, SuggestionDto } from '../dtos';

interface ISuggestionService {
  getAll(filter?: ServiceFilter<SuggestionDto>): Promise<SuggestionDto[]>;
  getById(id: number): Promise<SuggestionDto | null>;
  create(entity: CreateSuggestionDto): Promise<SuggestionDto>;
}

export default ISuggestionService;
