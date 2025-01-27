/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { UserDTO } from './../user/dtos/create-user.dto';

@ApiTags('auth') // Groups all endpoints under the 'auth' tag in Swagger
@Controller('auth')
export class AuthController {
  constructor(
    // Injecting AuthService
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in a user',
    description: 'Authenticates a user and returns an access token if the credentials are valid.',
  })
  @ApiResponse({ status: 200, description: 'User signed in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({
    description: 'Login credentials including email and password.',
    type: SignInDto,
    examples: {
      example: {
        summary: 'Valid login credentials',
        value: {
          email: 'user@example.com',
          password: 'password123',
        },
      },
    },
  })
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Registers a new user and returns the user details upon successful registration.',
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid user input data.' })
  @ApiBody({
    description: 'User details required for registration.',
    type: UserDTO,
    examples: {
      example: {
        summary: 'Valid user details',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'securePassword123',
        },
      },
    },
  })
  public async createUser(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }
}
