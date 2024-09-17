import { User } from '@/domain/entities';
import { Model } from 'sequelize';
import { AboutMeModel, RoleModel } from '.';
import attributes from './addons/attributes';
import options from './addons/options';

class UserModel extends Model<User> {
  declare id: number;
  declare name: string;
  declare nickname: string;
  declare number: string | null;
  declare email: string | null;
  declare password: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idRole: number;
  declare idAboutMe: number;

  declare role: RoleModel;
  declare aboutMe: AboutMeModel;
}

UserModel.init(attributes.user, options.user);

export default UserModel;
