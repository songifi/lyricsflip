import { Controller, Post, Put, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './providers/user.service';
import { UserDTO } from './dtos/create-user.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
//import { SignInDTO } from './dtos/sign-in.dto';
//import { UpdateProfileDTO } from './dtos/update-profile.dto';
//import { RefreshTokenDTO } from './dtos/refresh-token.dto';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UserRole } from './enums/user-role.enum';

// Controller for managing user operations.
@ApiTags('user')
@Controller('user')
@UseGuards(AccessTokenGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Sign up a new user
  @Post('signup')
  @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Create a new user account',
  })
  @ApiBody({ type: UserDTO })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  signUp(@Body() userDto: UserDTO) {
    return this.userService.signUp(userDto);
  }


  // Admin-only endpoint example
  @Get('all')
  @Roles(UserRole.ADMIN)
  getAllUsers() {
    return this.userService.findAllUsers();
  }


  // Moderator and Admin endpoint example
  @Put('moderate/:id')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  moderateUser(@Param('id') id: string) {
    return this.userService.moderateUser(id);
  }

  // Sign In a user
  @Post('signin')
  @ApiOperation({
    summary: 'Sign in a user',
    description: 'Authenticate user credentials',
  })
  // @ApiBody({ type: SignInDTO })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  signIn() {
    return this.userService.signIn();
  }

  // Retrieve user refresh access token
  @UseGuards(AccessTokenGuard)
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh user access token',
    description: 'Generate a new access token using refresh token',
  })
  //@ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({
    status: 200,
    description: 'Access token successfully refreshed',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
  })
  refreshToken() {
    return this.userService.refreshToken();
  }

  // Update user profile
  @UseGuards(AccessTokenGuard)
  @Put('profile')
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Modify user profile information',
  })
  // @ApiBody({ type: UpdateProfileDTO })
  @ApiResponse({
    status: 200,
    description: 'Profile successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid profile data',
  })
  updateProfile() {
    return this.userService.updateProfile();
  }
}
