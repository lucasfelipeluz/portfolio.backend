import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';
import { StatusCodes } from '@/core/enums';

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.badRequestError;
    this.code = StatusCodes.BadRequest;
  }
}

export default BadRequestError;
