import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';

class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.forbiddenError;
    this.code = StatusCodes.Forbidden;
  }
}

export default ForbiddenError;
