import Entity from './Entity';

class AboutMe extends Entity {
  public name: string;
  public jobTitle: string;
  public telegramLink: string;
  public youtubeLink: string;
  public linkedinLink: string;
  public githubLink: string;
  public address: string;
  public isAvailable: boolean;

  constructor(
    id: number,
    name: string,
    jobTitle: string,
    telegramLink: string,
    youtubeLink: string,
    linkedinLink: string,
    githubLink: string,
    address: string,
    isAvailable: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.name = name;
    this.jobTitle = jobTitle;
    this.telegramLink = telegramLink;
    this.youtubeLink = youtubeLink;
    this.linkedinLink = linkedinLink;
    this.githubLink = githubLink;
    this.address = address;
    this.isAvailable = isAvailable;
  }
}

export default AboutMe;
