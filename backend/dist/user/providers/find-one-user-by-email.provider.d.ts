import { User } from '../user.entity';
import { Repository } from 'typeorm';
export declare class FindOneUserByEmailProvider {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneUserByEmail(email: string): Promise<User>;
}
