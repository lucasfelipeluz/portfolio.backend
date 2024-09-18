import { httpResponses } from '@/api/utils';
import { LoginDto, RegisterDto } from '@/application/dtos';
import { IAuthService } from '@/application/interfaces';
import { AuthService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AuthController {
  private readonly authService: IAuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { nickname, email, number, password } = request.body;

      const user = new LoginDto(nickname, email, number, password);

      const userLogged = await this.authService.login(user);

      return httpResponses.ok(response, userLogged);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { name, nickname, email, password, number } = request.body;

      const newUser = new RegisterDto(name, nickname, email, number, password);

      const registedUser = await this.authService.register(newUser);

      return httpResponses.created(response, registedUser);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default AuthController;
