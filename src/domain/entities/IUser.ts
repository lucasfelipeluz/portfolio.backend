import UserRole from '@domain/enums/UserRole';

// type User = {
//   id: number;
//   name: string;
//   nickname: string;
//   email?: string;
//   password: string;
//   role: UserRole;

//   isActive: boolean;
//   createdAt: Date;
//   updatedAt?: Date;
//   deletedAt?: Date;
// };

class User {
  private id: number;
  private name: string;
  private nickname: string;
  private email?: string;
  private password: string;
  private role: UserRole;

  private isActive: boolean;
  private createdAt: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  constructor(
    id: number,
    name: string,
    nickname: string,
    email: string | null,
    password: string,
    role: UserRole,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;

    if (email) {
      this.email = email;
    }

    if (updatedAt) {
      this.updatedAt = updatedAt;
    }

    if (deletedAt) {
      this.deletedAt = deletedAt;
    }
  }
}

export default User;
