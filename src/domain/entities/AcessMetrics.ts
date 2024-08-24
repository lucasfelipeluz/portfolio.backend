class AcessMetrics {
  public id: number;
  public clientSource: string;
  public date: Date;

  constructor(id: number, clientSource: string, date: Date) {
    this.id = id;
    this.clientSource = clientSource;
    this.date = date;
  }
}

export default AcessMetrics;
