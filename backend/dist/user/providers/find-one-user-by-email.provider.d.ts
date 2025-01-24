<<<<<<< HEAD
import { User } from '../user.entity';
import { Repository } from 'typeorm';
export declare class FindOneUserByEmailProvider {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneUserByEmail(email: string): Promise<User>;
=======
import { HashingProvider } from 'src/auth/providers/hashing-provider';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
export declare class FindOneUserByEmailProvider {
    private userRepository;
    private readonly hashingProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider);
    FindOneByEmail(email: string): Promise<User>;
>>>>>>> 818061761b261076822681dd1ca861393938e264
}
