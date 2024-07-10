import ApplicationError from './ApplicationError';

class NotFoundEntityError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = `${this.constructor.name}: ${message}`;
    this.code = 404;
  }
}

export default NotFoundEntityError;
