import { LoginDto, RegisterDto, UserDto, UserLoggedDto } from '@/application/dtos';
import { IAuthService } from '@/application/interfaces';
import { BadRequestError, NotFoundEntityError, UnauthorizedError } from '@/core/errors';
import { User } from '@/domain/entities';
import { IApplicationConfigProvider, IUserRepository } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { UserRepository } from '@/infrastructure/repositories';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Op, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(
    userRepository: UserRepository,
    applicationConfigProvider: ApplicationConfigProvider,
  ) {
    this.userRepository = userRepository;
    this.applicationConfigProvider = applicationConfigProvider;
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
    const filter: WhereOptions<User> = {
      isActive: true,
      nickname: loginDto.getNickname(),
    };

    if (loginDto.getEmail()) {
      filter.email = loginDto.getEmail();
    }

    const user = await this.userRepository.getOne({
      where: filter,
    });

    if (!user) {
      throw new NotFoundEntityError('User not found');
    }

    const isAuthenticate = await bcrypt.compare(loginDto.getPassword(), user.password);

    if (!isAuthenticate) {
      throw new UnauthorizedError('Invalid password');
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    user.password = '';

    const token = jwt.sign(user, authConfig.secretKey, {
      expiresIn: authConfig.expiresIn,
    });

    return new UserLoggedDto(user.name, user.nickname, user.email, token);
  }

  async register(newUser: RegisterDto): Promise<UserDto> {
    const existNicknameUser = await this.userRepository.getOne({
      where: {
        nickname: newUser.getNickname(),
      },
    });

    if (existNicknameUser) {
      throw new BadRequestError('User already exists');
    }

    if (newUser.getEmail()) {
      const existEmailUser = await this.userRepository.getOne({
        where: {
          email: newUser.getEmail(),
        },
      });

      if (existEmailUser) {
        throw new BadRequestError('Email already in use');
      }
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    const salt = await bcrypt.genSalt(authConfig.salt);
    const passwordHash = await bcrypt.hash(newUser.getPassword(), salt);

    newUser.updatePassword(passwordHash);

    const user = newUser.toDomain();

    await this.userRepository.create(user);

    return new UserDto(user);
  }
}

export default AuthService;
