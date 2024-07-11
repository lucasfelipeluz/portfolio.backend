import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 401;
  }
}

export default UnauthorizedError;
