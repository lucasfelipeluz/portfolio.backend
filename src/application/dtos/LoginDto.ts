import { validateProperties } from '@/application/validations';
import { User } from '@/domain/entities';
import { ValidationError } from '@/core/errors';

class LoginDto {
  private nickname: string;
  private number: string | null;
  private email: string | null;
  private password: string;

  constructor(nickname: string, email: string | null, number: string | null, password: string) {
    this.nickname = nickname;
    this.number = number;
    this.email = email;
    this.password = password;

    this.validate();
  }

  private validate(): void {
    validateProperties<LoginDto>(this, ['password']);

    if (this.nickname && (this.nickname.length < 3 || this.nickname.length > 60)) {
      throw new ValidationError('Nickname must be between 3 and 60 characters');
    }
    if (this.email && (this.email.length < 3 || this.email.length > 120)) {
      throw new ValidationError('Email must be between 3 and 120 characters');
    }
    if (this.number && (this.number.length < 6 || this.number.length > 30)) {
      throw new ValidationError('Number must be between 8 and 30 characters');
    }
    if (this.password.length < 8 || this.password.length > 30) {
      throw new ValidationError('Password must be between 8 and 100 characters');
    }

    if (!this.nickname && !this.email && !this.number) {
      throw new ValidationError('You must provide a nickname, email or number');
    }
  }

  public toDomain(): User {
    return new User(
      '',
      '',
      this.nickname,
      '',
      this.email,
      this.password,
      true,
      new Date(),
      new Date(),
      null,
      0,
      0,
      null,
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

  public getNumber(): string | null {
    return this.number;
  }
}

export default LoginDto;
