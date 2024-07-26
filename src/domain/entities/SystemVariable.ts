import Entity from './Entity';

class SystemVariable extends Entity {
  public key: string;
  public value: string;

  constructor(
    id: number,
    key: string,
    value: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.key = key;
    this.value = value;
  }
}

export default SystemVariable;
