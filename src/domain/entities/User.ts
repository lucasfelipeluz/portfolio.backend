import Role from './Role';

class User {
  public id: number;
  public name: string;
  public nickname: string;
  public email: string | null;
  public password: string;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

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
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.idRole = idRole;
    this.role = role ?? ({} as Role);
  }
}

export default User;
