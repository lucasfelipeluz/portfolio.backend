import { StatusResponseTypes, Info } from '@src/types/StatusResponse';
import { Response } from 'express';

/* Pré-sets de respostas de servidor que são mais usadas */
class StatusResponse implements StatusResponseTypes {
  /* Respostas de sucesso */
  /* 200 - 226 */
  success<T>(res: Response<any>, data: T[] | T, info: Info) {
    return res.status(200).send({
      status: true,
      data,
      info,
    });
  }

  successWithoutData(res: Response<any>, info: Info) {
    return res.status(200).send({
      status: true,
      info,
    });
  }

  created<T>(res: Response<any>, data: T[] | T, info: Info) {
    return res.status(201).send({
      status: true,
      data,
      info,
    });
  }

  noContent(res: Response<any>) {
    return res.status(204).send();
  }

  /* Respostas de erro do cliente */
  /* 400 - 451 */
  badRequest(res: Response<any>, info: Info) {
    return res.status(400).send({
      status: false,
      info,
    });
  }

  unauthenticated(res: Response<any>, info: Info) {
    return res.status(401).send({
      status: false,
      info,
    });
  }

  forbidden(res: Response<any>, info: Info) {
    return res.status(403).send({
      status: false,
      info,
    });
  }

  notFound(res: Response<any>, info: Info) {
    return res.status(404).send({
      status: false,
      info,
    });
  }

  methodNotAllowed(res: Response<any>, info: Info) {
    return res.status(405).send({
      status: false,
      info,
    });
  }

  notAcceptable(res: Response<any>, info: Info) {
    return res.status(406).send({
      status: false,
      info,
    });
  }

  /* Respostas de erro do servidor */
  /* 500 - 511 */
  internalServerError(res: Response<any>, info: Info) {
    return res.status(500).send({
      status: false,
      info,
    });
  }

  notImplemented(res: Response<any>, info: Info) {
    return res.status(501).send({
      status: false,
      info,
    });
  }

  serviceUnavailable(res: Response<any>, info: Info) {
    return res.status(503).send({
      status: true,
      info,
    });
  }
}

export default new StatusResponse();
