import { LoginDto, RegisterDto, UserDto, UserLoggedDto } from '@/application/dtos';

interface IAuthService {
  getInfoUser(nickname: string, email: string): Promise<UserDto>;
  login(user: LoginDto): Promise<UserLoggedDto>;
  register(newUser: RegisterDto): Promise<UserDto>;
}

export default IAuthService;
