import Entity from './Entity';
import User from './User';

class Role extends Entity {
  public name: string;

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
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.name = name;
    this.users = users ?? [];
  }
}

export default Role;
