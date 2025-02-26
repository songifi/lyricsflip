import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../authConfig/jwt.config';
import { UserService } from '../../user/providers/user.service';
import { HashingProvider } from './hashing-provider';

@Injectable()
export class PasswordResetProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async generateResetToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: '15m', // Short-lived token
      },
    );
  }

  async sendResetEmail(email: string, token: string): Promise<void> {
    // Simulate sending email
    console.log(`Password reset token for ${email}: ${token}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { sub } = await this.jwtService.verifyAsync(token, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });
    const hashedPassword = await this.hashingProvider.hashPassword(newPassword);
    await this.userService.updateUserPassword(sub, hashedPassword);
  }
}