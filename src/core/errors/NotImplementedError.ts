import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';
import ApplicationError from './ApplicationError';

class NotImplementedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.notImplementedError;
    this.code = StatusCodes.NotImplemented;
  }
}

export default NotImplementedError;
