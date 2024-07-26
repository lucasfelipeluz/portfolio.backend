import { LoginDto, RegisterDto, UserDto, UserLoggedDto } from '@/application/dtos';
import { IAuthService } from '@/application/interfaces';
import { BadRequestError, NotFoundEntityError, UnauthorizedError } from '@/core/errors';
import { ServiceFilter } from '@/core/types';
import { transform } from '@/core/utils';
import { User } from '@/domain/entities';
import { IApplicationConfigProvider, IUserRepository } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { UserRepository } from '@/infrastructure/repositories';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
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
    const filters: ServiceFilter<UserDto> = {
      where: {
        nickname: nickname,
        email: email,
      },
      isActive: true,
    };

    const options = transform.serviceFilterToModelFilter<UserDto, User>(filters);

    const user = await this.userRepository.getOne(options);

    if (!user) {
      return {} as UserDto;
    }

    return new UserDto(user);
  }

  async login(loginDto: LoginDto): Promise<UserLoggedDto> {
    const filter: ServiceFilter<UserDto> = {
      where: {
        nickname: loginDto.getNickname(),
      },
      isActive: true,
    };

    if (loginDto.getEmail() && filter.where) {
      filter.where['email'] = loginDto.getEmail();
    }

    const options = transform.serviceFilterToModelFilter<UserDto, User>(filter);

    const user = await this.userRepository.getOne(options);

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
    const filters: ServiceFilter<UserDto> = {
      where: {
        nickname: newUser.getNickname(),
      },
    };

    const options = transform.serviceFilterToModelFilter<UserDto, User>(filters);

    const existNicknameUser = await this.userRepository.getOne(options);

    if (existNicknameUser) {
      throw new BadRequestError('User already exists');
    }

    if (newUser.getEmail()) {
      const filtersEmail: ServiceFilter<UserDto> = {
        where: {
          email: newUser.getEmail(),
        },
      };

      const optionsEmail = transform.serviceFilterToModelFilter<UserDto, User>(filtersEmail);

      const existEmailUser = await this.userRepository.getOne(optionsEmail);

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
