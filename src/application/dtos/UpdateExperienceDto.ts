import { ValidationError } from '@/core/errors';
import { Experience } from '@/domain/entities';

class UpdateExperienceDto {
  private id: number | null;
  private jobTitle: string;
  private companyName: string;
  private description: string;
  private startedAt: Date;
  private finishedAt: Date | null;
  private base64PathImage: string;

  constructor(
    id: number | null,
    jobTitle: string,
    companyName: string,
    description: string,
    startedAt: Date,
    base64PathImage: string,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.description = description;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.base64PathImage = base64PathImage;

    this.validate();
  }

  private validate(): void {
    if (this.jobTitle && (this.jobTitle.length < 3 || this.jobTitle.length > 100)) {
      throw new ValidationError('Job title must be between 3 and 100 characters');
    }
    if (this.companyName && (this.companyName.length < 3 || this.companyName.length > 100)) {
      throw new ValidationError('Company name must be between 3 and 100 characters');
    }
    if (this.description && (this.description.length < 3 || this.description.length > 500)) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.startedAt && this.startedAt > new Date()) {
      throw new ValidationError('Started at must be less than current date');
    }
    if (this.startedAt && this.finishedAt) {
      if (this.startedAt > this.finishedAt) {
        throw new ValidationError('Finished date must be greater than started date');
      }
    }
    if (this.base64PathImage && this.base64PathImage.length === 0) {
      throw new ValidationError('Base64 path image is required');
    }
  }

  public toDomain(pathImage: string): Experience {
    return {
      id: this.id,
      jobTitle: this.jobTitle,
      companyName: this.companyName,
      description: this.description,
      pathImage,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    } as Experience;
  }

  public getBase64(): string {
    return this.base64PathImage;
  }
}

export default UpdateExperienceDto;
