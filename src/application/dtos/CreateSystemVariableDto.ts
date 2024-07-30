import { ValidationError } from '@/core/errors';
import { validateProperties } from '../validations';
import { SystemVariable } from '@/domain/entities';

class CreateSystemVariableDto {
  public key: string;
  public value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateSystemVariableDto>(this, ['key', 'value']);

    if (this.key.length < 3 || this.key.length > 120) {
      throw new ValidationError('Key must be between 3 and 120 characters');
    }
    if (this.value.length < 3 || this.value.length > 255) {
      throw new ValidationError('Value must be between 3 and 255 characters');
    }
  }

  public toDomain(): SystemVariable {
    return {
      key: this.key,
      value: this.value,
    } as SystemVariable;
  }
}

export default CreateSystemVariableDto;
