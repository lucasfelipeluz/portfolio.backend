import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.code = 400;
  }
}

export default BadRequestError;
