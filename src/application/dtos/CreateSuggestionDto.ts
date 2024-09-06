import { ValidationError } from '@/core/errors';
import { validateProperties } from '../validations';
import { Suggestion } from '@/domain/entities';

class CreateSuggestionDto {
  private title: string;

  constructor(title: string) {
    this.title = title;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateSuggestionDto>(this, ['title']);

    if (this.title.length < 3 || this.title.length > 500) {
      throw new ValidationError('Title must be between 3 and 120 characters');
    }
  }

  public toDomain(): Suggestion {
    return new Suggestion(0, this.title, true, new Date(), null, null);
  }
}

export default CreateSuggestionDto;
