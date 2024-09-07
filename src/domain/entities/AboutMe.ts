import Entity from './Entity';

class AboutMe extends Entity {
  public name: string;
  public text: string;
  public jobTitle: string;
  public telegramLink: string;
  public youtubeLink: string;
  public linkedinLink: string;
  public githubLink: string;
  public address: string;
  public pathCv: string;
  public pathProfilePic: string;
  public isAvailable: boolean;

  constructor(
    id: number,
    name: string,
    text: string,
    jobTitle: string,
    telegramLink: string,
    youtubeLink: string,
    linkedinLink: string,
    githubLink: string,
    address: string,
    pathCv: string,
    pathProfilePic: string,
    isAvailable: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.name = name;
    this.text = text;
    this.jobTitle = jobTitle;
    this.telegramLink = telegramLink;
    this.youtubeLink = youtubeLink;
    this.linkedinLink = linkedinLink;
    this.githubLink = githubLink;
    this.address = address;
    this.pathCv = pathCv;
    this.pathProfilePic = pathProfilePic;
    this.isAvailable = isAvailable;
  }
}

export default AboutMe;
