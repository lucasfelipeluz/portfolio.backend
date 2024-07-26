import { StatusCodes } from '@/core/enums';
import {
  ApplicationError,
  BadRequestError,
  ForbiddenError,
  NotFoundEntityError,
  UnauthorizedError,
  ValidationError,
} from '@/core/errors';
import { strings } from '@/core/utils';

const stringErrorText = 'This is an error message';

describe('Application Errors', () => {
  it('should return all properties of the error', () => {
    const applicationError = new ApplicationError(stringErrorText);

    expect(applicationError.message).toBe(stringErrorText);
    expect(applicationError.name).toBe(strings.applicationError);
    expect(applicationError.code).toBe(StatusCodes.InternalServerError);
  });
});

describe('Bad Request Error', () => {
  it('should return all properties of the error', () => {
    const badRequestError = new BadRequestError(stringErrorText);

    expect(badRequestError.message).toBe(stringErrorText);
    expect(badRequestError.name).toBe(strings.badRequestError);
    expect(badRequestError.code).toBe(StatusCodes.BadRequest);
  });
});

describe('Forbidden Error', () => {
  it('should return all properties of the error', () => {
    const forbiddenError = new ForbiddenError(stringErrorText);

    expect(forbiddenError.message).toBe(stringErrorText);
    expect(forbiddenError.name).toBe(strings.forbiddenError);
    expect(forbiddenError.code).toBe(StatusCodes.Forbidden);
  });
});

describe('Not Found Entity Error', () => {
  it('should return all properties of the error', () => {
    const notFoundEntityError = new NotFoundEntityError(stringErrorText);

    expect(notFoundEntityError.message).toBe(stringErrorText);
    expect(notFoundEntityError.name).toBe(strings.notFoundEntityError);
    expect(notFoundEntityError.code).toBe(StatusCodes.BadRequest);
  });
});

describe('Validation Error', () => {
  it('should return all properties of the error', () => {
    const validationError = new ValidationError(stringErrorText);

    expect(validationError.message).toBe(stringErrorText);
    expect(validationError.name).toBe(strings.validationError);
    expect(validationError.code).toBe(StatusCodes.BadRequest);
  });
});

describe('Unauthorized Error', () => {
  it('should return all properties of the error', () => {
    const unauthorizedError = new UnauthorizedError(stringErrorText);

    expect(unauthorizedError.message).toBe(stringErrorText);
    expect(unauthorizedError.name).toBe(strings.unauthorizedError);
    expect(unauthorizedError.code).toBe(StatusCodes.Unauthorized);
  });
});
