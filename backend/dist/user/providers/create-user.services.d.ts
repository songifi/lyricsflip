import { HashingProvider } from './hashing.provider';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dtos/create-user.dto';
export declare class CreateUserProvider {
    private readonly userRepository;
    private readonly hashingProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider);
    createUsers(userDto: UserDTO): Promise<User[]>;
}
