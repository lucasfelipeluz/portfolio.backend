import { AboutMe } from '@/domain/entities';

class AboutMeDto {
  public id?: number;
  public name?: string;
  public jobTitle?: string;
  public telegramLink?: string;
  public youtubeLink?: string;
  public linkedinLink?: string;
  public githubLink?: string;
  public address?: string;
  public isAvailable?: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(aboutMe: AboutMe) {
    this.id = aboutMe.id;
    this.name = aboutMe.name;
    this.jobTitle = aboutMe.jobTitle;
    this.telegramLink = aboutMe.telegramLink;
    this.youtubeLink = aboutMe.youtubeLink;
    this.linkedinLink = aboutMe.linkedinLink;
    this.githubLink = aboutMe.githubLink;
    this.address = aboutMe.address;
    this.isAvailable = aboutMe.isAvailable;
    this.createdAt = aboutMe.createdAt;
    this.updatedAt = aboutMe.updatedAt;
    this.deletedAt = aboutMe.deletedAt;
  }
}

export default AboutMeDto;
