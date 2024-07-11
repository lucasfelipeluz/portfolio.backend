import { validateProperties } from '@/application/validations';
import { User } from '@/domain/entities';
import { ValidationError } from '@/core/errors';

class LoginDto {
  private nickname: string;
  private email: string | null;
  private password: string;

  constructor(nickname: string, email: string | null, password: string) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;

    this.validate();
  }

  private validate(): void {
    validateProperties<LoginDto>(this, ['password']);

    if (this.nickname.length < 3 || this.nickname.length > 60) {
      throw new ValidationError('Nickname must be between 3 and 60 characters');
    }
    if (this.email && (this.email.length < 3 || this.email.length > 120)) {
      throw new ValidationError('Email must be between 3 and 120 characters');
    }
    if (this.password.length < 8 || this.password.length > 30) {
      throw new ValidationError('Password must be between 8 and 100 characters');
    }
  }

  public toDomain(): User {
    return new User(
      0,
      '',
      this.nickname,
      this.email,
      this.password,
      false,
      new Date(),
      null,
      null,
      0,
      null,
    );
  }

  public getPassword(): string {
    return this.password;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public getNickname(): string {
    return this.nickname;
  }
}

export default LoginDto;
