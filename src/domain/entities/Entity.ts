/**
 * @abstract
 * This class is the base class for all entities.
 */
abstract class Entity {
  public id: number;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(
    id: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    this.id = id;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
  }
}

export default Entity;
