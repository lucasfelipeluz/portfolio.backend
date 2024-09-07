import Entity from './Entity';

class Suggestion extends Entity {
  public text: string;

  constructor(
    id: number,
    text: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.text = text;
  }
}

export default Suggestion;
