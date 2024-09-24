class AcessMetrics {
  public id: number;
  public route: string;

  public date: Date;
  public idUser: string;

  constructor(id: number, route: string, date: Date, idUser: string) {
    this.id = id;
    this.route = route;
    this.date = date;
    this.idUser = idUser;
  }
}

export default AcessMetrics;
