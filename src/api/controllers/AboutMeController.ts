import { httpResponses } from '@/api/utils';
import { UpdateAboutMeDto } from '@/application/dtos';
import { IAboutMeService } from '@/application/interfaces';
import { AboutMeService } from '@/application/services';
import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AboutMeController {
  private readonly aboutMeService: IAboutMeService;

  constructor(aboutMeService: AboutMeService) {
    this.aboutMeService = aboutMeService;
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const entity = await this.aboutMeService.get();

      return httpResponses.ok(response, entity);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        text,
        jobTitle,
        telegramLink,
        youtubeLink,
        linkedinLink,
        githubLink,
        base64Cv,
        base64ProfilePic,
        address,
        isAvailable,
      } = request.body;

      const entity = new UpdateAboutMeDto(
        name,
        text,
        jobTitle,
        telegramLink,
        youtubeLink,
        linkedinLink,
        githubLink,
        base64Cv,
        base64ProfilePic,
        address,
        isAvailable,
      );

      const newEntity = await this.aboutMeService.update(entity);

      return httpResponses.ok(response, newEntity);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default AboutMeController;
