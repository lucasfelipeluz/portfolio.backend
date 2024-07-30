import { Request, Response } from 'express';

interface ISystemVariableController {
  get(request: Request, response: Response): Promise<unknown>;
  create(request: Request, response: Response): Promise<unknown>;
  delete(request: Request, response: Response): Promise<unknown>;
}

export default ISystemVariableController;
