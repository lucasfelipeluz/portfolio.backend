import { ValidationError } from '@/core/errors';
import { Experience } from '@/domain/entities';

class UpdateExperienceDto {
  public id: number | null;
  public jobTitle: string;
  public companyName: string;
  public description: string;
  public startedAt: Date;
  public finishedAt: Date | null;

  constructor(
    id: number | null,
    jobTitle: string,
    companyName: string,
    description: string,
    startedAt: Date,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.description = description;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;

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
}

export default UpdateExperienceDto;
