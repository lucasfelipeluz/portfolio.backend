class UserLoggedDto {
  public name: string;
  public nickname: string;
  public email: string | null;
  public token: string;

  constructor(name: string, nickname: string, email: string | null, token: string) {
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.token = token;
  }
}

export default UserLoggedDto;
