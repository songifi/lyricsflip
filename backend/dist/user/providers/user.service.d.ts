import { AuthService } from './../../auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserProvider } from './create-user.services';
import { UserDTO } from '../dtos/create-user.dto';
export declare class UserService {
    private readonly authService;
    private readonly findOneUserByEmailProvider;
    private readonly userRepository;
    private readonly createUserProvider;
    constructor(authService: AuthService, findOneUserByEmailProvider: FindOneUserByEmailProvider, userRepository: Repository<User>, createUserProvider: CreateUserProvider);
    findUserByEmail(email: string): Promise<User>;
    FindOneById(id: string): Promise<User | null>;
    signUp(userDto: UserDTO): Promise<User[]>;
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}
