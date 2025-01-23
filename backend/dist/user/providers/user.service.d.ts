import { AuthService } from 'src/auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
<<<<<<< HEAD
=======
import { User } from '../user.entity';
import { Repository } from 'typeorm';
>>>>>>> 818061761b261076822681dd1ca861393938e264
import { CreateUserProvider } from './create-user.services';
import { UserDTO } from '../dtos/create-user.dto';
export declare class UserService {
    private readonly authService;
    private readonly findOneUserByEmailProvider;
<<<<<<< HEAD
    private readonly createUserProvider;
    constructor(authService: AuthService, findOneUserByEmailProvider: FindOneUserByEmailProvider, createUserProvider: CreateUserProvider);
    findUserByEmail(email: string): Promise<import("../user.entity").User>;
    signUp(userDto: UserDTO): Promise<import("../user.entity").User[]>;
=======
    private readonly userRepository;
    private readonly createUserProvider;
    constructor(authService: AuthService, findOneUserByEmailProvider: FindOneUserByEmailProvider, userRepository: Repository<User>, createUserProvider: CreateUserProvider);
    findUserByEmail(email: string): Promise<User>;
    FindOneById(id: number): Promise<User | null>;
    signUp(userDto: UserDTO): Promise<(User & User[])[]>;
>>>>>>> 818061761b261076822681dd1ca861393938e264
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}
