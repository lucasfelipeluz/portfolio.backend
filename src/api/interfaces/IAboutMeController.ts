import { Request, Response } from 'express';

interface IAboutMeController {
  get(request: Request, response: Response): Promise<unknown>;
  update(request: Request, response: Response): Promise<unknown>;
}

export default IAboutMeController;
