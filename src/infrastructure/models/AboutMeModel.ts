import { AboutMe } from '@/domain/entities';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';

class AboutMeModel extends Model<AboutMe> {
  declare id: number;
  declare name: string;
  declare text: string;
  declare jobTitle: string;
  declare telegramLink: string;
  declare youtubeLink: string;
  declare linkedinLink: string;
  declare githubLink: string;
  declare address: string;
  declare pathCv: string;
  declare pathProfilePic: string;
  declare isAvailable: boolean;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;
}

AboutMeModel.init(attributes.aboutMe, options.aboutMe);

export default AboutMeModel;
