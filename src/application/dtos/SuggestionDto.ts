import { Suggestion } from '@/domain/entities';

class SuggestionDto {
  public id: number | null;
  public text: string;
  public isActive: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(suggestion: Suggestion) {
    this.id = suggestion.id;
    this.text = suggestion.text;
    this.isActive = suggestion.isActive;
    this.createdAt = suggestion.createdAt;
    this.updatedAt = suggestion.updatedAt;
    this.deletedAt = suggestion.deletedAt;
  }
}

export default SuggestionDto;
