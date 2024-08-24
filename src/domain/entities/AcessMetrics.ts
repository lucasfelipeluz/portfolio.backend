class AcessMetrics {
  public id: string;
  public clientSource: string;
  public date: Date;

  constructor(id: string, clientSource: string, date: Date) {
    this.id = id;
    this.clientSource = clientSource;
    this.date = date;
  }
}

export default AcessMetrics;
