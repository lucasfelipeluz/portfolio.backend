import { Model } from 'sequelize';
import { SystemVariable } from '@/domain/entities';
import attributes from './addons/attributes';
import options from './addons/options';
import UserModel from './UserModel';

class SystemVariableModel extends Model<SystemVariable> {
  declare id: number;
  declare key: string;
  declare value: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idUser: string;

  declare user: UserModel;
}

SystemVariableModel.init(attributes.systemVariable, options.systemVariable);

export default SystemVariableModel;
