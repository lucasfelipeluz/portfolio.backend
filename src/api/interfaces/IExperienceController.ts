import { Request, Response } from 'express';

interface IExperienceController {
  getAll(request: Request<unknown>, response: Response<unknown>): Promise<unknown>;
  getById(request: Request<unknown>, response: Response<unknown>): Promise<unknown>;
  create(request: Request<unknown>, response: Response<unknown>): Promise<unknown>;
  update(request: Request<unknown>, response: Response<unknown>): Promise<unknown>;
  delete(request: Request<unknown>, response: Response<unknown>): Promise<unknown>;
}

export default IExperienceController;
