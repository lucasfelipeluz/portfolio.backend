import Project from '@/domain/entities/Project';
import ValidationError from '../errors/ValidationError';
import { validateProperties } from '../validations';

class CreateProjectDto {
  private title: string;
  private description: string;
  private urlWebsite: string;
  private urlGithub: string;
  private viewPriority: number;
  private startedAt: Date;
  private finishedAt: Date | null;

  constructor(
    title: string,
    description: string,
    urlWebsite: string,
    urlGithub: string,
    viewPriority: number,
    startedAt: Date,
    finishedAt: Date | null,
  ) {
    this.title = title;
    this.description = description;
    this.urlWebsite = urlWebsite;
    this.urlGithub = urlGithub;
    this.viewPriority = viewPriority;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;

    this.validate();
  }

  private validate() {
    validateProperties<CreateProjectDto>(this, [
      'title',
      'description',
      'urlWebsite',
      'urlGithub',
      'viewPriority',
      'startedAt',
    ]);

    if (this.title.length < 3 || this.title.length > 120) {
      throw new ValidationError('Name must be between 3 and 120 characters');
    }
    if (this.description.length < 3 || this.description.length > 500) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.urlWebsite.length < 3 || this.urlWebsite.length > 255) {
      throw new ValidationError('Website URL must be between 3 and 255 characters');
    }
    if (this.urlGithub.length < 3 || this.urlGithub.length > 255) {
      throw new ValidationError('GitHub URL must be between 3 and 255 characters');
    }
    if (this.viewPriority < 0 || this.viewPriority > 100) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
    if (this.startedAt > new Date()) {
      throw new ValidationError('Started date must be less than current date');
    }
    if (this.finishedAt) {
      if (this.startedAt > this.finishedAt) {
        throw new ValidationError('Finished date must be greater than started date');
      }
    }
  }

  public toDomain(): Project {
    return new Project(
      0,
      this.title,
      this.description,
      this.urlWebsite,
      this.urlGithub,
      this.viewPriority,
      this.startedAt,
      this.finishedAt,
      true,
      new Date(),
      null,
      null,
      null,
    );
  }
}

export default CreateProjectDto;
