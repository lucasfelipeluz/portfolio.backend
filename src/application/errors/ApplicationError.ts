class ApplicationError extends Error {
  private code: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 500;
    this.message = message;
  }
}

export default ApplicationError;
