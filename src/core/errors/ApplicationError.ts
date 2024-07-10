import { StatusCodes } from '@/core/enums';

class ApplicationError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = StatusCodes.InternalServerError;
  }
}

export default ApplicationError;
