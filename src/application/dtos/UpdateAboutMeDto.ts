import { ValidationError } from '@/core/errors';
import { AboutMe } from '@/domain/entities';

class UpdateAboutMeDto {
  private name?: string;
  private jobTitle?: string;
  private telegramLink?: string;
  private youtubeLink?: string;
  private linkedinLink?: string;
  private githubLink?: string;
  private address?: string;
  private isAvailable?: boolean;

  constructor(
    name?: string,
    jobTitle?: string,
    telegramLink?: string,
    youtubeLink?: string,
    linkedinLink?: string,
    githubLink?: string,
    address?: string,
    isAvailable?: boolean,
  ) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.telegramLink = telegramLink;
    this.youtubeLink = youtubeLink;
    this.linkedinLink = linkedinLink;
    this.githubLink = githubLink;
    this.address = address;
    this.isAvailable = isAvailable;

    this.validate();
  }

  private validate(): void {
    if (this.name && (this.name.length < 3 || this.name.length > 120)) {
      throw new ValidationError('Name must be between 3 and 120 characters');
    }
    if (this.jobTitle && (this.jobTitle.length < 3 || this.jobTitle.length > 120)) {
      throw new ValidationError('Job title must be between 3 and 120 characters');
    }
    if (this.telegramLink && (this.telegramLink.length < 3 || this.telegramLink.length > 255)) {
      throw new ValidationError('Telegram link must be between 3 and 255 characters');
    }
    if (this.youtubeLink && (this.youtubeLink.length < 3 || this.youtubeLink.length > 255)) {
      throw new ValidationError('YouTube link must be between 3 and 255 characters');
    }
    if (this.linkedinLink && (this.linkedinLink.length < 3 || this.linkedinLink.length > 255)) {
      throw new ValidationError('LinkedIn link must be between 3 and 255 characters');
    }
    if (this.githubLink && (this.githubLink.length < 3 || this.githubLink.length > 255)) {
      throw new ValidationError('GitHub link must be between 3 and 255 characters');
    }
    if (this.address && (this.address.length < 3 || this.address.length > 255)) {
      throw new ValidationError('Address must be between 3 and 255 characters');
    }
  }

  public toDomain(): AboutMe {
    return {
      name: this.name,
      jobTitle: this.jobTitle,
      telegramLink: this.telegramLink,
      youtubeLink: this.youtubeLink,
      linkedinLink: this.linkedinLink,
      githubLink: this.githubLink,
      address: this.address,
      isAvailable: this.isAvailable,
    } as AboutMe;
  }
}

export default UpdateAboutMeDto;
