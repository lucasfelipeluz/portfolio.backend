import Skill from '@/domain/entities/Skill';
import ValidationError from '../errors/ValidationError';

class UpdateSkillDto {
  private id: number;
  private title?: string;
  private description?: string;
  private startedAt?: Date;
  private icon?: string;
  private color?: string;
  private viewPriority?: number;

  constructor(
    id: number,
    title?: string,
    description?: string,
    startedAt?: Date,
    icon?: string,
    color?: string,
    viewPriority?: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startedAt = startedAt;
    this.icon = icon;
    this.color = color;
    this.viewPriority = viewPriority;

    this.validate();
  }

  private validate() {
    if (this.title && (this.title.length < 3 || this.title.length > 120)) {
      throw new ValidationError('Name must be between 3 and 120 characters');
    }
    if (this.description && (this.description.length < 3 || this.description.length > 500)) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.icon && (this.icon.length < 3 || this.icon.length > 50)) {
      throw new ValidationError('Icon must be between 3 and 50 characters');
    }
    if (this.color && (this.color.length < 3 || this.color.length > 10)) {
      throw new ValidationError('Color must be between 3 and 10 characters');
    }
    if (this.startedAt && this.startedAt > new Date()) {
      throw new ValidationError('Started date must be less than current date');
    }
    if (this.viewPriority && (this.viewPriority < 0 || this.viewPriority > 100)) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
  }

  public toDomain(): Skill {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startedAt: this.startedAt,
      icon: this.icon,
      color: this.color,
      viewPriority: this.viewPriority,
    } as Skill;
  }
}

export default UpdateSkillDto;
