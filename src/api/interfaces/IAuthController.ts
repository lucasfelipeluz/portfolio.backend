import { Request, Response } from 'express';

interface IAuthController {
  login(request: Request, response: Response): Promise<unknown>;
  register(request: Request, response: Response): Promise<unknown>;
}

export default IAuthController;
