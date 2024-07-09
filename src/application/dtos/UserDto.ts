import { User } from '@/domain/entities';
import RoleDto from './RoleDto';

class UserDto {
  private id: number | null;
  private name: string;
  private nickname: string;
  private email: string | null;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  private idRole: number;

  private role: RoleDto | null;

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
