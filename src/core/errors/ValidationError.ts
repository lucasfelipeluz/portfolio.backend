import { StatusCodes } from '@/core/enums';
import ApplicationError from './ApplicationError';

class ValidationError extends ApplicationError {
  public readonly code: number;

  constructor(message: string) {
    super(message);
    this.name = `${this.constructor.name}: ${message}`;
    this.code = StatusCodes.BadRequest;
  }
}

export default ValidationError;
