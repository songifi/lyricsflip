/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, forwardRef, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../../user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserDTO } from './../../user/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { PasswordResetProvider } from './password-reset.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // Inject JWT service
    private readonly passwordResetProvider: PasswordResetProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  /**
   * Authenticates a user by verifying their email and password.
   * 
   * @param signInDto - The data transfer object containing user email and password.
   * @throws {UnauthorizedException} If the user is not found or the password does not match.
   * @returns Confirmation message upon successful authentication.
   */
  public signIn(signInDto: SignInDto) {
    //Find the user using email
    //If the user is not found throw an error
    //Compare the password
    // Confirmation Message
  }

  // Forgot Password
  public async forgotPassword(email: string): Promise<{ message: string }> {
    await this.passwordResetProvider.requestReset(email);
    // Same answer whether or not the account exists.
    return { message: 'If that email is registered, a reset link is on its way.' };
  }

  // Reset Password
  public async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    await this.passwordResetProvider.resetPassword(token, newPassword);
    return { message: 'Password updated.' };
  }

  
  public async signUp(userDto: UserDTO) {
    return await this.userService.signUp(userDto);
  }

  
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    let decoded: { userId: string; family?: string; jti?: string };
    try {
      // Verify the refresh token
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { userId, family, jti } = decoded;
    if (!family || !jti) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Detect reuse: the jti must be known and not already rotated.
    const isUsable = await this.refreshTokensProvider.isTokenUsable(family, jti);
    if (!isUsable) {
      // Reuse of an already-rotated (or unknown) token: revoke the whole family.
      await this.refreshTokensProvider.revokeFamily(family);
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Fetch user details based on decoded token payload
    const user = await this.userService.FindOneById(userId);
    if (!user) {
      await this.refreshTokensProvider.revokeFamily(family);
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Mark the presented token as rotated so it cannot be used again.
    await this.refreshTokensProvider.markRotated(family, jti);

    // Issue a new access token and a new refresh token in the same family.
    const newAccessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' }
    );

    const newRefreshToken = await this.refreshTokensProvider.issueRefreshToken(
      user.id,
      family,
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  /**
   * Revokes the refresh-token family associated with the presented token.
   */
  public async logout(refreshTokenDto: RefreshTokenDto): Promise<{ message: string }> {
    const { refreshToken } = refreshTokenDto;

    let decoded: { family?: string };
    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!decoded.family) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.refreshTokensProvider.revokeFamily(decoded.family);
    return { message: 'Logged out.' };
  }
}
