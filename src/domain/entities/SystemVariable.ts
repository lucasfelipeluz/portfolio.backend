import Entity from './Entity';
import User from './User';

class SystemVariable extends Entity {
  public key: string;
  public value: string;

  public idUser: string;

  public user: User;

  constructor(
    id: number,
    key: string,
    value: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idUser: string,
    user: User,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.key = key;
    this.value = value;
    this.idUser = idUser;
    this.user = user;
  }
}

export default SystemVariable;
