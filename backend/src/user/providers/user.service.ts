import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

// Service responsible for handling user operations.
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //Inject findoneuserbyemailprovider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async findUserByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }

  // Placeholder for user-related business logic
  // Sign up a user.
  signUp() {
    // Implement sign up logic
   return 'userService: Sign-up logic placeholder';
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
