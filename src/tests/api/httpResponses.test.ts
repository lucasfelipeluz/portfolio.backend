import { Response } from 'express';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { httpResponses } from '@/api/utils';

// Mock do objeto Response do Express
const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Response Handlers', () => {
  let res: Response;

  beforeEach(() => {
    res = mockResponse();
  });

  test('ok - should return 200 with data', () => {
    const data = { key: 'value' };
    httpResponses.ok(res, data);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(data);
  });

  test('ok - should return 200 with data and message', () => {
    const data = { key: 'value' };
    const message = 'Success';
    httpResponses.ok(res, data, message);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message, data });
  });

  test('created - should return 201 with data', () => {
    const data = { key: 'value' };
    httpResponses.created(res, data);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ data });
  });

  test('created - should return 201 with data and message', () => {
    const data = { key: 'value' };
    const message = 'Resource created';
    httpResponses.created(res, data, message);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message, data });
  });

  test('accepted - should return 202 with data', () => {
    const data = { key: 'value' };
    httpResponses.accepted(res, data);
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.send).toHaveBeenCalledWith({ data });
  });

  test('nonAuthoritativeInformation - should return 203 with data', () => {
    const data = { key: 'value' };
    httpResponses.nonAuthoritativeInformation(res, data);
    expect(res.status).toHaveBeenCalledWith(203);
    expect(res.send).toHaveBeenCalledWith({ data });
  });

  test('noContent - should return 204', () => {
    httpResponses.noContent(res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test('partialContent - should return 206 with data', () => {
    const data = { key: 'value' };
    httpResponses.partialContent(res, data);
    expect(res.status).toHaveBeenCalledWith(206);
    expect(res.send).toHaveBeenCalledWith({ data });
  });

  test('movedPermanently - should return 301 with new URL and message', () => {
    const newUrl = 'http://new-url.com';
    const message = 'Resource moved';
    httpResponses.movedPermanently(res, newUrl, message);
    expect(res.status).toHaveBeenCalledWith(301);
    expect(res.send).toHaveBeenCalledWith({ newUrl, message });
  });

  test('badRequest - should return 400 with message', () => {
    const message = 'Bad request';
    httpResponses.badRequest(res, message);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message });
  });

  test('unauthorized - should return 401 with message', () => {
    const message = 'Unauthorized';
    httpResponses.unauthorized(res, message);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message });
  });

  test('forbidden - should return 403 with message', () => {
    const message = 'Forbidden';
    httpResponses.forbidden(res, message);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({ message });
  });

  test('notFound - should return 404 with message', () => {
    httpResponses.notFound(res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: strings.urlNotFound });
  });

  test('methodNotAllowed - should return 405 with message', () => {
    const message = 'Method not allowed';
    httpResponses.methodNotAllowed(res, message);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.send).toHaveBeenCalledWith({ message });
  });

  test('internalServerError - should return 500 with message and error', () => {
    const message = 'Internal server error';
    const error = new ApplicationError('Error occurred');
    httpResponses.internalServerError(res, message, error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message, error });
  });

  test('handleServerError - should handle generic server error', () => {
    const message = 'Server error';
    const error = new ApplicationError('Unexpected error');
    httpResponses.handleServerError(res, message, error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: strings.internalServerError, error });
  });
});
