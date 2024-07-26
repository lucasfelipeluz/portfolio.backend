import { Request, Response } from 'express';

interface IHomeController {
  get(request: Request, response: Response): Promise<unknown>;
  getProject(request: Request, response: Response): Promise<unknown>;
  getSkill(request: Request, response: Response): Promise<unknown>;
}

export default IHomeController;
