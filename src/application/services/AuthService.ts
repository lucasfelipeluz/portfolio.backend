import { LoginDto, RegisterDto, UserDto, UserLoggedDto } from '@/application/dtos';
import { IAuthService } from '@/application/interfaces';
import {
  ApplicationError,
  BadRequestError,
  NotFoundEntityError,
  UnauthorizedError,
} from '@/core/errors';
import { PayloadAuthUser, ServiceFilter } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { AboutMe, User } from '@/domain/entities';
import { initTransaction } from '@/infrastructure/config/dbConnection';
import {
  IAboutMeRepository,
  IApplicationConfigProvider,
  IUserRepository,
} from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { AboutMeRepository, UserRepository } from '@/infrastructure/repositories';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;
  private readonly aboutMeRepository: IAboutMeRepository;
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(
    userRepository: UserRepository,
    aboutMeRepository: AboutMeRepository,
    applicationConfigProvider: ApplicationConfigProvider,
  ) {
    this.userRepository = userRepository;
    this.aboutMeRepository = aboutMeRepository;
    this.applicationConfigProvider = applicationConfigProvider;
  }

  private async verifyIfUserExists(newUser: RegisterDto): Promise<void> {
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

    if (newUser.getNumber()) {
      const filtersNumber: ServiceFilter<UserDto> = {
        where: {
          number: newUser.getNumber(),
        },
      };

      const optionsNumber = transform.serviceFilterToModelFilter<UserDto, User>(filtersNumber);

      const existNumberUser = await this.userRepository.getOne(optionsNumber);

      if (existNumberUser) {
        throw new BadRequestError('Number already in use');
      }
    }
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
      where: {},
      isActive: true,
    };

    if (loginDto.getNickname()) {
      if (!filter.where) {
        filter.where = {};
      }
      filter.where['nickname'] = loginDto.getNickname();
    }

    if (loginDto.getEmail() && filter.where) {
      filter.where['email'] = loginDto.getEmail();
    }

    if (loginDto.getNumber() && filter.where) {
      filter.where['number'] = loginDto.getNumber();
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

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        number: user.number,
        role: user.role.name,
      } as PayloadAuthUser,
      authConfig.secretKey,
      {
        expiresIn: authConfig.expiresIn,
      },
    );

    return new UserLoggedDto(user.id, user.name, user.nickname, user.email, user.number, token);
  }

  async register(newUser: RegisterDto): Promise<UserDto> {
    const transaction = await initTransaction();
    try {
      await this.verifyIfUserExists(newUser);

      const authConfig = this.applicationConfigProvider.getAuthConfig();

      const salt = await bcrypt.genSalt(authConfig.salt);
      const passwordHash = await bcrypt.hash(newUser.getPassword(), salt);

      newUser.updatePassword(passwordHash);

      const user = newUser.toDomain();

      const newAboutMe = new AboutMe(
        0,
        user.name,
        strings.defaultText,
        strings.defaultJobTitle,
        strings.defaultTelegram,
        strings.defaultYoutube,
        strings.defaultLinkedin,
        strings.defaultGithub,
        strings.defaultAddress,
        strings.defaultCv,
        strings.defaultProfilePic,
        false,
        true,
        new Date(),
        new Date(),
        null,
      );

      const createdAboutMe = await this.aboutMeRepository.create(newAboutMe, { transaction });

      user.idAboutMe = createdAboutMe.id;

      await this.userRepository.create(user, { transaction });

      await transaction.commit();

      return new UserDto(user);
    } catch (error) {
      await transaction.rollback();

      if (error instanceof ApplicationError) {
        throw error;
      } else {
        throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
      }
    }
  }
}

export default AuthService;
