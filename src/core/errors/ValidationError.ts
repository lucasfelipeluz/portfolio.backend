import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';

class ValidationError extends ApplicationError {
  public readonly code: number;

  constructor(message: string) {
    super(message);
    this.name = strings.validationError;
    this.code = StatusCodes.BadRequest;
  }
}

export default ValidationError;
