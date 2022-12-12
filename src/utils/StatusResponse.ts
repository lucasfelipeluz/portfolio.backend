import { StatusResponseTypes, Info } from '@src/types/StatusResponse';
import { Response } from 'express';

/* Pré-sets de respostas de servidor que são mais usadas */
class StatusResponse implements StatusResponseTypes {
  /* Respostas de sucesso */
  /* 200 - 226 */
  success<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(200).send({
      success: true,
      data,
      info,
    });
  }

  created<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(201).send({
      success: true,
      data,
      info,
    });
  }

  noContent(res: Response<any>) {
    return res.status(204);
  }

  /* Respostas de erro do cliente */
  /* 400 - 451 */
  badRequest<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(400).send({
      success: true,
      data,
      info,
    });
  }

  unauthenticated<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(401).send({
      success: true,
      data,
      info,
    });
  }

  forbidden<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(403).send({
      success: true,
      data,
      info,
    });
  }

  notFound<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(404).send({
      success: true,
      data,
      info,
    });
  }

  methodNotAllowed<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(405).send({
      success: true,
      data,
      info,
    });
  }

  notAcceptable<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(406).send({
      success: true,
      data,
      info,
    });
  }

  /* Respostas de erro do servidor */
  /* 500 - 511 */
  internalServerError<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(500).send({
      success: true,
      data,
      info,
    });
  }

  notImplemented<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(501).send({
      success: true,
      data,
      info,
    });
  }

  serviceUnavailable<T>(res: Response<any>, data: T[], info: Info) {
    return res.status(503).send({
      success: true,
      data,
      info,
    });
  }
}

export default new StatusResponse();
