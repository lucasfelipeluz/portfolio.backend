import { InitOptions, Model, ModelAttributes } from 'sequelize';
import User from '@domain/entities/IUser';
import UserRole from '@/domain/enums/UserRole';
import dbConnection from '@infrastructure/config/dbConnection';

class UserModel extends Model<User> {
  declare id: number;
  declare name: string;
  declare nickname: string;
  declare email?: string;
  declare password: string;
  declare role: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;

  /**
   * Get attributes for UserModel
   */
  static getAttr(): ModelAttributes<UserModel> {
    return {} as ModelAttributes<UserModel>;
  }

  /**
   * Get options for UserModel
   */
  static getOptions(): InitOptions<UserModel> {
    return {
      sequelize: dbConnection,
    };
  }

  static userToModel(user: User): UserModel {
    return new UserModel(user);
  }

  /**
   * Mapping UserModel to User entity
   */
  toEntity(): User {
    return new User(
      this.id,
      this.name,
      this.nickname,
      this.email ?? null,
      this.password,
      this.role as UserRole,
      this.isActive,
      this.createdAt,
      this.updatedAt ?? null,
      this.deletedAt ?? null,
    );
  }
}

// const attributes: ModelAttributes<UserModel> = {};

// const options: InitOptions<UserModel> = {
//   sequelize: dbConnection,
// };

UserModel.init(UserModel.getAttr(), UserModel.getOptions());

export default UserModel;
