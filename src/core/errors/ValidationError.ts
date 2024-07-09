import { StatusCodes } from '@/core/enums';
import ApplicationError from './ApplicationError';

class ValidationError extends ApplicationError {
  public readonly code: number;

  constructor(message: string) {
    super(`Validation Error`);
    this.name = `${this.constructor.name}: ${message}`;
    this.code = StatusCodes.BadRequest;
    this.message = message;
  }
}

export default ValidationError;
