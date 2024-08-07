import { validateProperties } from '@/application/validations';
import { User } from '@/domain/entities';
import { ValidationError } from '@/core/errors';
import { UserRole } from '@/domain/addons';

class RegisterDto {
  private name: string;
  private nickname: string;
  private email: string | null;
  private password: string;
  private idRole: number;

  constructor(name: string, nickname: string, email: string | null, password: string) {
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.idRole = UserRole.Guest;

    this.validate();
  }

  private validate(): void {
    validateProperties<RegisterDto>(this, ['name', 'nickname', 'password']);

    if (this.name.length < 3 || this.name.length > 100) {
      throw new ValidationError('Name must be between 3 and 100 characters');
    }
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
      this.name,
      this.nickname,
      this.email,
      this.password,
      true,
      new Date(),
      null,
      null,
      this.idRole,
      null,
    );
  }

  getPassword(): string {
    return this.password;
  }

  updatePassword(password: string): void {
    this.password = password;
  }

  getNickname(): string {
    return this.nickname;
  }

  getEmail(): string | null {
    return this.email;
  }
}

export default RegisterDto;
