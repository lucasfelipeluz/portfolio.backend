import AboutMe from './AboutMe';
import Entity from './Entity';
import Role from './Role';

class User extends Entity {
  public name: string;
  public nickname: string;
  public number: string | null;
  public email: string | null;
  public password: string;

  public idRole: number;
  public idAboutMe: number;

  public readonly role: Role;
  public readonly aboutMe: AboutMe;

  constructor(
    id: number,
    name: string,
    nickname: string,
    number: string | null,
    email: string | null,
    password: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idRole: number,
    idAboutMe: number,
    role: Role | null,
    aboutMe: AboutMe | null,
  ) {
    super(id, isActive, createdAt, updatedAt, deletedAt);

    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.number = number;
    this.email = email;
    this.password = password;
    this.idRole = idRole;
    this.idAboutMe = idAboutMe;
    this.role = role ?? ({} as Role);
    this.aboutMe = aboutMe ?? ({} as AboutMe);
  }
}

export default User;
