import { validateProperties } from '@/application/validations';
import { User } from '@/domain/entities';
import { ValidationError } from '@/core/errors';
import { UserRole } from '@/domain/addons';
import { v4 as generateUuidV4 } from 'uuid';

class RegisterDto {
  private name: string;
  private nickname: string;
  private email: string | null;
  private number: string | null;
  private password: string;
  private idRole: number;
  private idAboutMe: number | null;

  constructor(
    name: string,
    nickname: string,
    email: string | null,
    number: string | null,
    password: string,
  ) {
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.number = number;
    this.password = password;
    this.idRole = UserRole.Guest;
    this.idAboutMe = null;

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
    if (this.number && (this.number.length < 6 || this.number.length > 30)) {
      throw new ValidationError('Number must be between 8 and 30 characters');
    }
    if (this.password.length < 8 || this.password.length > 30) {
      throw new ValidationError('Password must be between 8 and 100 characters');
    }
  }

  public toDomain(): User {
    return new User(
      generateUuidV4(),
      this.name,
      this.nickname,
      this.number,
      this.email,
      this.password,
      true,
      new Date(),
      new Date(),
      null,
      this.idRole,
      0,
      null,
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

  getNumber(): string | null {
    return this.number;
  }

  updateIdAboutMe(idAboutMe: number): void {
    this.idAboutMe = idAboutMe;
  }
}

export default RegisterDto;
