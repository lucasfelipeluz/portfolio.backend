import User from './User';

class Role {
  public id: number;
  public name: string;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public readonly users: User[];

  constructor(
    id: number,
    name: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    users?: User[] | null,
  ) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.users = users ?? [];
  }
}

export default Role;
