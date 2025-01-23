/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { UserDTO } from 'src/user/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    // Injecting AuthService
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto) {}

  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }
}
