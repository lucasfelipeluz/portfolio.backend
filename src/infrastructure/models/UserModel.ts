import { User } from '@/domain/entities';
import { Model } from 'sequelize';
import { RoleModel } from '.';
import attributes from './addons/attributes';
import options from './addons/options';

class UserModel extends Model<User> {
  declare id: number;
  declare name: string;
  declare nickname: string;
  declare email: string | null;
  declare password: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idRole: number;

  declare role: RoleModel;
}

UserModel.init(attributes.user, options.user);

export default UserModel;
