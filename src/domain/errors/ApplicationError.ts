import StatusCodes from '../enums/StatusCodes';

class ApplicationError extends Error {
  public readonly code: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = StatusCodes.InternalServerError;
    this.message = message;
  }
}

export default ApplicationError;
