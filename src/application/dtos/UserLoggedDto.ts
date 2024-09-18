class UserLoggedDto {
  public id: string;
  public name: string;
  public nickname: string;
  public email: string | null;
  public number: string | null;
  public token: string;

  constructor(
    id: string,
    name: string,
    nickname: string,
    email: string | null,
    number: string | null,
    token: string,
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.number = number;
    this.token = token;
  }
}

export default UserLoggedDto;
