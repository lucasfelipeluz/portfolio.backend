import { StatusCodes } from '@/core/enums';
import { strings } from '@/core/utils';

class ApplicationError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = strings.applicationError;
    this.code = StatusCodes.InternalServerError;
  }
}

export default ApplicationError;
