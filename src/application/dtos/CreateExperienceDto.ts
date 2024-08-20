import { ValidationError } from '@/core/errors';
import { validateProperties } from '../validations';
import { Experience } from '@/domain/entities';

class CreateExperienceDto {
  public jobTitle: string;
  public companyName: string;
  public description: string;
  public pathImage: string;
  public startedAt: Date;
  public finishedAt: Date | null;

  constructor(
    jobTitle: string,
    companyName: string,
    description: string,
    pathImage: string,
    startedAt: Date,
    finishedAt: Date | null,
  ) {
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.description = description;
    this.pathImage = pathImage;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateExperienceDto>(this, [
      'jobTitle',
      'companyName',
      'description',
      'pathImage',
      'startedAt',
    ]);

    if (this.jobTitle.length < 3 || this.jobTitle.length > 100) {
      throw new ValidationError('Job title must be between 3 and 100 characters');
    }
    if (this.companyName.length < 3 || this.companyName.length > 100) {
      throw new ValidationError('Company name must be between 3 and 100 characters');
    }
    if (this.description.length < 3 || this.description.length > 500) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.pathImage.length < 3 || this.pathImage.length > 255) {
      throw new ValidationError('Path image must be between 3 and 255 characters');
    }
    if (this.startedAt > new Date()) {
      throw new ValidationError('Started at must be less than current date');
    }
    if (this.finishedAt) {
      if (this.startedAt > this.finishedAt) {
        throw new ValidationError('Finished date must be greater than started date');
      }
    }
  }

  public toDomain(): Experience {
    return new Experience(
      0,
      this.jobTitle,
      this.companyName,
      this.description,
      this.pathImage,
      this.startedAt,
      this.finishedAt,
      true,
      new Date(),
      null,
      null,
    );
  }
}

export default CreateExperienceDto;
