import { Request, Response } from 'express';
import StatusResponse from '@src/utils/StatusResponse';

export default class ProjetosControllers {
  public getProjetos(req: Request, res: Response): Response {
    console.log('opa');
    const data = ['strinjg', 'irir', 'uuu'];
    return StatusResponse.success<string>(res, data, {});
  }
}
