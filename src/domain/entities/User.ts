import Entity from './Entity';
import Role from './Role';

class User extends Entity {
  public id: number;
  public name: string;
  public nickname: string;
  public email: string | null;
  public password: string;

  public idRole: number;

  public readonly role: Role;

  constructor(
    id: number,
    name: string,
    nickname: string,
    email: string | null,
    password: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idRole: number,
    role: Role | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.idRole = idRole;
    this.role = role ?? ({} as Role);
  }
}

export default User;
