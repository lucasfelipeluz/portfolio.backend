import { ValidationError } from '@/core/errors';
import { validateProperties } from '../validations';
import { Experience } from '@/domain/entities';

class CreateExperienceDto {
  private jobTitle: string;
  private companyName: string;
  private description: string;
  private startedAt: Date;
  private finishedAt: Date | null;
  private base64PathImage: string;

  constructor(
    jobTitle: string,
    companyName: string,
    description: string,
    startedAt: Date,
    base64PathImage: string,
    finishedAt: Date | null,
  ) {
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.description = description;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.base64PathImage = base64PathImage;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateExperienceDto>(this, [
      'jobTitle',
      'companyName',
      'description',
      'startedAt',
      'base64PathImage',
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
    if (this.startedAt > new Date()) {
      throw new ValidationError('Started at must be less than current date');
    }
    if (this.finishedAt) {
      if (this.startedAt > this.finishedAt) {
        throw new ValidationError('Finished date must be greater than started date');
      }
    }
    if (!this.base64PathImage) {
      throw new ValidationError('Path image is required');
    }
  }

  public toDomain(pathImage: string): Experience {
    return new Experience(
      0,
      this.jobTitle,
      this.companyName,
      this.description,
      pathImage,
      this.startedAt,
      this.finishedAt,
      true,
      new Date(),
      null,
      null,
    );
  }

  public getBase64(): string {
    return this.base64PathImage;
  }
}

export default CreateExperienceDto;
