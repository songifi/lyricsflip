import { HashingProvider } from 'src/auth/providers/hashing-provider';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
export declare class FindOneUserByEmailProvider {
    private userRepository;
    private readonly hashingProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider);
    FindOneByEmail(email: string): Promise<User>;
}
