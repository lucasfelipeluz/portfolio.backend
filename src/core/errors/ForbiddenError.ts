import ApplicationError from './ApplicationError';

class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.code = 403;
  }
}

export default ForbiddenError;
