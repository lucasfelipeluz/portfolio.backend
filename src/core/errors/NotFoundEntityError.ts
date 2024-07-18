import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';

class NotFoundEntityError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.notFoundEntityError;
    this.code = StatusCodes.BadRequest;
  }
}

export default NotFoundEntityError;
