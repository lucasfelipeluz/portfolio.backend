import { Role } from '@/domain/entities';
import { Model } from 'sequelize';
import { UserModel } from './';
import attributes from './addons/attributes';
import options from './addons/options';

class RoleModel extends Model<Role> {
  declare id: number;
  declare name: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare users: UserModel[];
}

RoleModel.init(attributes.role, options.role);

export default RoleModel;
