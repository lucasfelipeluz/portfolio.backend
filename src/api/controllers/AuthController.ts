import { IAuthController } from '@/api/interfaces';
import { IAuthService } from '@/application/interfaces';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { httpResponses } from '@/api/utils';
import { ApplicationError } from '@/core/errors';
import { AuthService } from '@/application/services';
import { LoginDto, RegisterDto } from '@/application/dtos';

@autoInjectable()
class AuthController implements IAuthController {
  private readonly authService: IAuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(request: Request, response: Response): Promise<unknown> {
    try {
      const { nickname, email, password } = request.body;

      const user = new LoginDto(nickname, email, password);

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

  async register(request: Request, response: Response): Promise<unknown> {
    try {
      const { name, nickname, email, password } = request.body;

      const newUser = new RegisterDto(name, nickname, email, password);

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
