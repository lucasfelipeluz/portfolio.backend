import { AcessMetrics } from '@/domain/entities';
import UserDto from './UserDto';

class AcessMetricsDto {
  public id: number;
  public route: string;
  public date: Date;
  public idUser: string;

  public user: UserDto | null;

  constructor(acessMetrics: AcessMetrics, include?: boolean) {
    this.id = acessMetrics.id;
    this.route = acessMetrics.route;
    this.date = acessMetrics.date;
    this.idUser = acessMetrics.idUser;

    if (include) {
      this.user = acessMetrics.user;
    } else {
      this.user = null;
    }
  }
}

export default AcessMetricsDto;
