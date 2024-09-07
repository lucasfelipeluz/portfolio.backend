import { ValidationError } from '@/core/errors';
import { validateProperties } from '../validations';
import { Suggestion } from '@/domain/entities';

class CreateSuggestionDto {
  private text: string;

  constructor(text: string) {
    this.text = text;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateSuggestionDto>(this, ['text']);

    if (this.text.length < 3 || this.text.length > 500) {
      throw new ValidationError('Title must be between 3 and 120 characters');
    }
  }

  public toDomain(): Suggestion {
    return new Suggestion(0, this.text, true, new Date(), null, null);
  }
}

export default CreateSuggestionDto;
