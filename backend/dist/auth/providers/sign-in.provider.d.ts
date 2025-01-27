import { UserService } from './../../user/providers/user.service';
import { HashingProvider } from './hashing-provider';
import { GenerateTokensProvider } from './generate-tokens-provider';
import { SignInDto } from '../dtos/signIn.dto';
export declare class SignInProvider {
    private readonly userService;
    private readonly hashingProvider;
    private readonly generateTokenProvider;
    constructor(userService: UserService, hashingProvider: HashingProvider, generateTokenProvider: GenerateTokensProvider);
    SignIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../../user/user.entity").User;
    }>;
}
