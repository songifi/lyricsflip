/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    // Injecting AuthService
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto) {}
}
