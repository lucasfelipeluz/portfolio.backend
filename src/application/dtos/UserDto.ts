import { User } from '@/domain/entities';
import RoleDto from './RoleDto';

class UserDto {
  public id: number | null;
  public name: string;
  public nickname: string;
  public email: string | null;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idRole: number;

  public role: RoleDto | null;

  constructor(user: User, include = false) {
    this.id = user.id;
    this.name = user.name;
    this.nickname = user.nickname;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
    this.idRole = user.idRole;

    if (include) {
      this.role = new RoleDto(user.role);
    } else {
      this.role = null;
    }
  }
}

export default UserDto;
