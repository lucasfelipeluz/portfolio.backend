import strings from '@/domain/utils/strings';
import { Response } from 'express';

/**
 * `200` - The request was successful. The meaning of the "success" result
 * depends on the HTTP method:
 * - GET: The resource was fetched and transmitted in the message body.
 * - HEAD: The representation headers are included in the response without any message body.
 * - PUT or POST: The resource describing the result of the action is transmitted in the message
 * body.
 * - TRACE: The message body contains the request message received by the server.
 */
function ok<T>(res: Response, data: T, message?: string) {
  if (data && !message) return res.status(200).send(data);

  return res.status(200).send({ message, data });
}

/**
 * `201` - The request was successful and as a result, a new resource was created.
 * Typically, this is the response sent after a POST or PUT request.
 */
function created<T>(res: Response, data: T, message?: string) {
  return res.status(201).send({ message, data });
}

/**
 * `202`- The request has been received but has not been acted upon yet. It is non-committal,
 * since there is no way in HTTP to later send an asynchronous response
 * indicating the outcome of the request. It is intended for cases where another
 * process or server handles the request or batch processing.
 */
function accepted<T>(res: Response, data: T) {
  return res.status(202).send({ data });
}

/**
 * `203` - This response code means that the returned metadata
 * is not exactly the same as available on the origin server,
 * but is collected from a local or third-party copy. This is mainly used
 * for mirrors or backups of another resource. Except for this specific case,
 * the 200 OK response is preferred over this status.
 */
function nonAuthoritativeInformation<T>(res: Response, data: T) {
  return res.status(203).send({ data });
}

/**
 * `204` - There is no content to send for this request, but the headers may be useful.
 * The user agent may update its cached headers for this resource with the new ones.
 */
function noContent(res: Response) {
  return res.status(204).send();
}

/**
 * `206` - This response code is used when the Range header is sent from the
 * client to request only part of a resource.
 */
function partialContent<T>(res: Response, data: T) {
  return res.status(206).send({ data });
}

/**
 * `301` - The URL of the requested resource has been permanently changed.
 * The new URL is provided in the response.
 */
function movedPermanently(res: Response, newUrl: string, message?: string) {
  return res.status(301).send({ newUrl, message });
}

/**
 * `400` - This response means that the server did not understand the request.
 */
function badRequest(res: Response, message: string) {
  return res.status(400).send({ message });
}

/**
 * `401` - Although the HTTP standard specifies "unauthorized", semantically, this response
 * means "unauthenticated". In other words, the client must authenticate itself to get the
 * requested response.
 */
function unauthorized(res: Response, message: string) {
  return res.status(401).send({ message });
}

/**
 * `403` - The client does not have access rights to the content, in other words, it is forbidden.
 */
function forbidden(res: Response, message: string) {
  return res.status(403).send({ message });
}

/**
 * `404` - The server cannot find the requested resource.
 */
function notFound(res: Response) {
  return res.status(404).send({ message: strings.urlNotFound });
}

/**
 * `405` - The request method is known by the server, but has been disabled
 * and cannot be used.
 * Example: A client tries to use a POST method on a resource that only accepts GET requests.
 */
function methodNotAllowed(res: Response, message: string) {
  return res.status(405).send({ message });
}

/**
 * `500` - The server encountered an unexpected situation that prevented it from fulfilling the request.
 */
function internalServerError(res: Response, message: string, error?: any) {
  console.log(error);
  return res.status(error.code || 500).send({ message, error });
}

/**
 * Method to handle server errors.
 */
function handleServerError(res: Response, message: string, error: any) {
  if (!error.code || error.code === 500) {
    return internalServerError(res, strings.internalServerError, error);
  }
  return res.status(error.code).send({ message: error.message || message, error });
}

export default {
  ok,
  created,
  accepted,
  nonAuthoritativeInformation,
  noContent,
  partialContent,
  movedPermanently,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalServerError,
  handleServerError,
};
