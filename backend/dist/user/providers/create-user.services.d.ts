import { HashingProvider } from './hashing.provider';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dtos/create-user.dto';
export declare class CreateUserProvider {
    private readonly userRepository;
    private readonly hashingProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider);
<<<<<<< HEAD
    createUsers(userDto: UserDTO): Promise<User[]>;
=======
    createUsers(userDto: UserDTO): Promise<(User & User[])[]>;
>>>>>>> 818061761b261076822681dd1ca861393938e264
}
