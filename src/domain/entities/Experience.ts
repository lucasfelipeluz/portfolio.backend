import Entity from './Entity';

class Experience extends Entity {
  public jobTitle: string;
  public companyName: string;
  public description: string;
  public pathImage: string;
  public startedAt: Date;
  public finishedAt: Date | null;

  constructor(
    id: number,
    jobTitle: string,
    companyName: string,
    description: string,
    pathImage: string,
    startedAt: Date,
    finishedAt: Date | null,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.description = description;
    this.pathImage = pathImage;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
  }
}

export default Experience;
