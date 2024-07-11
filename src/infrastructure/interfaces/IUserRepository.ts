import { User } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface IUserRepository extends IBaseRepository<User> {}

export default IUserRepository;
