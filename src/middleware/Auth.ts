import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import StatusResponse from '@src/utils/StatusResponse';

export default class Auth {
  private chaveToken!: string;

  private chaveAdmin!: string;

  constructor() {
    // Como o init é usando como middleware, ele tem o this modificado,
    // usando o bind o this é o Auth novamente.
    this.init = this.init.bind(this);

    dotenv.config();
    this.chaveAdmin = process.env.key_admin || 'testeteste';
    this.chaveToken = process.env.key_token || 'testeteste';
  }

  public init(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const verification = verify(token!, this.chaveToken);

      if (verification) {
        return next();
      }

      return StatusResponse.forbidden(res, {
        msgError: 'Usuário não autenticado!',
      });
    } catch ({ message }) {
      console.log(message);
      return StatusResponse.forbidden(res, {
        msgError: 'Usuário não autenticado!',
      });
    }
  }
}
