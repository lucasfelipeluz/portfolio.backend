import { Request, Response } from 'express';

interface IHomeController {
  get(request: Request, response: Response): Promise<unknown>;
}

export default IHomeController;
