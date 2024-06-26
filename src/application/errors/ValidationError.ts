class ValidationError extends Error {
  private code: number;

  constructor(message: string) {
    super(`Validation Error`);
    this.name = 'ValidationError';
    this.code = 400;
    this.message = message;
  }
}

export default ValidationError;
