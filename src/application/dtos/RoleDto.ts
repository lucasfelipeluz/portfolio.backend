import { Role } from '@/domain/entities';
import UserDto from './UserDto';

class RoleDto {
  private id: number | null;
  private name: string;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  private readonly users: UserDto[] | null;

  constructor(role: Role, include = false) {
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.deletedAt = role.deletedAt;

    if (include) {
      this.users = role.users.map((user) => new UserDto(user));
    } else {
      this.users = null;
    }
  }
}

export default RoleDto;
