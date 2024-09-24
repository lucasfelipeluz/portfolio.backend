import User from './User';

class AcessMetrics {
  public id: number;
  public route: string;
  public date: Date;
  public idUser: string;

  public readonly user: User | null;

  constructor(id: number, route: string, date: Date, idUser: string, user: User | null) {
    this.id = id;
    this.route = route;
    this.date = date;
    this.idUser = idUser;
    this.user = user;
  }
}

export default AcessMetrics;
