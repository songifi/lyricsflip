import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './../../auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateUserProvider } from './create-user.services';
import { UserDTO } from '../dtos/create-user.dto';

// Service responsible for handling user operations.
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //Inject findoneuserbyemailprovider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    /* 
     * Inject user repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    //Inject create user provider
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async findUserByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }

  public FindOneById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({id});
}

  // Placeholder for user-related business logic
  // Sign up a user.
  public async signUp(userDto: UserDTO) {
    // Implement sign up logic
    return await this.createUserProvider.createUsers(userDto);
  }

  // Sign in a user.
  signIn() {
    // Implement sign in logic
    return 'userService: Sign-in logic placeholder';
  }

  // Retrieve refresh token.
  refreshToken() {
    // Implement token refresh logic
    return 'userService: Refresh token logic placeholder';
  }
  // Update user profile.
  updateProfile() {
    // Implement profile update logic
    return 'userService: Update profile logic placeholder';
  }
}
