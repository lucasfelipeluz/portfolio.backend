import { Suggestion } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface ISuggestionRepository extends IBaseRepository<Suggestion> {}

export default ISuggestionRepository;
