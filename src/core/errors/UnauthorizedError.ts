import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.unauthorizedError;
    this.code = StatusCodes.Unauthorized;
  }
}

export default UnauthorizedError;
