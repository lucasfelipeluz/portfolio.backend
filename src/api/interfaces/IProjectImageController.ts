import { Request, Response } from 'express';

interface IProjectImageController {
  create(request: Request, response: Response): Promise<unknown>;
  updateViewPriority(request: Request, response: Response): Promise<unknown>;
  delete(request: Request, response: Response): Promise<unknown>;
}

export default IProjectImageController;
