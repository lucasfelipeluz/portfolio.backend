import { LoginDto, RegisterDto, UserDto, UserLoggedDto } from '@/application/dtos';
import { IAuthService } from '@/application/interfaces';
import { IUserRepository } from '@/infrastructure/interfaces';
import { UserRepository } from '@/infrastructure/repositories';
import { Op } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import * as bcrypt from 'bcrypt';

@injectable()
class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getInfoUser(nickname: string, email: string): Promise<UserDto> {
    const user = await this.userRepository.getOne({
      where: {
        [Op.or]: { nickname, email },
        isActive: true,
      },
    });

    if (!user) {
      return {} as UserDto;
    }

    return new UserDto(user);
  }

  async login(loginDto: LoginDto): Promise<UserLoggedDto> {
    const user = await this.userRepository.getOne({
      where: {
        [Op.or]: { nickname: loginDto.getNickname(), email: loginDto.getEmail() },
        isActive: true,
      },
    });

    if (!user) {
      return {} as UserLoggedDto;
    }

    const isAuthenticate = await bcrypt.compare(loginDto.getPassword(), user.password);

    if (!isAuthenticate) {
      return {} as UserLoggedDto;
    }

    const token = jwt.sign({ id: user.id }, 'teste', { expiresIn: '1d' });

    return new UserLoggedDto(user.name, user.nickname, user.email, token);
  }

  async register(newUser: RegisterDto): Promise<UserDto> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.getPassword(), salt);

    newUser.updatePassword(passwordHash);

    const user = newUser.toDomain();

    await this.userRepository.create(user);

    return new UserDto(user);
  }
}

export default AuthService;
