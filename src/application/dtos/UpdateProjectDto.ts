import { Project } from '@/domain/entities';
import { ValidationError } from '@/core/errors';

class UpdateProjectDto {
  private id: number;
  private title?: string;
  private description?: string;
  private urlWebsite?: string;
  private urlGithub?: string;
  private viewPriority?: number;
  private startedAt?: Date;
  private finishedAt?: Date | null;

  constructor(
    id: number,
    title?: string,
    description?: string,
    urlWebsite?: string,
    urlGithub?: string,
    viewPriority?: number,
    startedAt?: Date,
    finishedAt?: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.urlWebsite = urlWebsite;
    this.urlGithub = urlGithub;
    this.viewPriority = viewPriority;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;

    this.validate();
  }

  private validate(): void {
    if (this.title && (this.title.length < 3 || this.title.length > 120)) {
      throw new ValidationError('Name must be between 3 and 120 characters');
    }
    if (this.description && (this.description.length < 3 || this.description.length > 500)) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.urlWebsite && (this.urlWebsite.length < 3 || this.urlWebsite.length > 255)) {
      throw new ValidationError('Website URL must be between 3 and 255 characters');
    }
    if (this.urlGithub && (this.urlGithub.length < 3 || this.urlGithub.length > 255)) {
      throw new ValidationError('GitHub URL must be between 3 and 255 characters');
    }
    if (this.viewPriority && (this.viewPriority < 0 || this.viewPriority > 100)) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
    if (this.startedAt && this.startedAt > new Date()) {
      throw new ValidationError('Started date must be less than current date');
    }
    if (this.startedAt && this.finishedAt) {
      if (this.startedAt > this.finishedAt) {
        throw new ValidationError('Finished date must be greater than started date');
      }
    }
  }

  public toDomain(): Project {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      urlWebsite: this.urlWebsite,
      urlGithub: this.urlGithub,
      viewPriority: this.viewPriority,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      isActive: true,
      createdAt: new Date(),
      images: [],
      skills: [],
      deletedAt: null,
      updatedAt: null,
    } as Project;
  }
}

export default UpdateProjectDto;
