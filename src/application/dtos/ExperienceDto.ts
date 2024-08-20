import { Experience } from '@/domain/entities';

class ExperienceDto {
  public id: number | null;
  public jobTitle: string;
  public companyName: string;
  public description: string;
  public pathImage: string;
  public startedAt: Date;
  public finishedAt: Date | null;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(experience: Experience) {
    this.id = experience.id;
    this.jobTitle = experience.jobTitle;
    this.companyName = experience.companyName;
    this.description = experience.description;
    this.pathImage = experience.pathImage;
    this.startedAt = experience.startedAt;
    this.finishedAt = experience.finishedAt;
    this.createdAt = experience.createdAt;
    this.updatedAt = experience.updatedAt;
    this.deletedAt = experience.deletedAt;
  }
}

export default ExperienceDto;
