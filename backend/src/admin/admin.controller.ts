import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from './providers/admin.service';
import { AdminDTO } from './dtos/create-admin.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';

// Controller for managing administrative operations.
@ApiTags('admin') // Groups all endpoints under the 'admin' tag in Swagger
@UseGuards(AccessTokenGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Sign up a new admin
    @Post('signup')
    @ApiOperation({
      summary: 'Sign up a new admin',
      description: 'Create a new admin account',
    })
    @ApiBody({ type: AdminDTO })
    @ApiResponse({
      status: 201,
      description: 'User successfully created',
    })
    @ApiResponse({
      status: 400,
      description: 'Invalid input',
    })
    signUp(@Body() adminDto: AdminDTO) {
      return this.adminService.signUp(adminDto);
    }

  // Retrieve platform statistics.
  @Get('stats')
  @ApiOperation({
    summary: 'Retrieve platform statistics',
    description: 'Fetch key statistics and metrics for the platform.',
  })
  @ApiResponse({
    status: 200,
    description: 'Platform statistics retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getPlatformStats() {
    return this.adminService.getPlatformStats();
  }

  // Manage user accounts and permissions.
  @Post('users/manage')
  @ApiOperation({
    summary: 'Manage user accounts and permissions',
    description:
      'Perform operations to manage user accounts, including updating roles, permissions, and statuses.',
  })
  @ApiResponse({
    status: 200,
    description: 'User accounts managed successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data provided.' })
  @ApiBody({
    description:
      'Details for managing users, such as user IDs and permissions.',
    schema: {
      example: {
        userId: '12345',
        action: 'update-role',
        role: 'admin',
      },
    },
  })
  manageUsers() {
    return this.adminService.manageUsers();
  }

  // Add a new song to the platform.
  @Post('songs/add')
  @ApiOperation({
    summary: 'Add a new song to the platform',
    description:
      'Create a new song entry with metadata such as title, artist, and album.',
  })
  @ApiResponse({ status: 201, description: 'New song added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid song data provided.' })
  @ApiBody({
    description:
      'Details of the song to add, including title, artist, and album.',
    schema: {
      example: {
        title: 'New Song',
        artist: 'Artist Name',
        album: 'Album Name',
        duration: 210,
      },
    },
  })
  addSong() {
    return this.adminService.addSong();
  }
}

// import { Controller, Get, Post } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { AdminService } from './providers/admin.service';

// // controller for managing administrative operations.
// @ApiTags('admin')
// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   // Retrieve platform statistics.
//   @Get('stats')
//   @ApiOperation({ summary: 'Get platform stats' })
//   @ApiResponse({ status: 200, description: 'Platform stats retrieved' })
//   @ApiResponse({ status: 500, description: 'Internal server error' })
//   getPlatformStats() {
//     return this.adminService.getPlatformStats();
//   }

//   //  Manage user accounts and permissions.
//   @Post('users/manage')
//   @ApiOperation({ summary: 'Manage users' })
//   @ApiResponse({ status: 200, description: 'Users managed successfully' })
//   @ApiResponse({ status: 400, description: 'Invalid input data' })
//   manageUsers() {
//     return this.adminService.manageUsers();
//   }

//   //  Add a new song to the platform.
//   @Post('songs/add')
//   @ApiOperation({ summary: 'Add a new song' })
//   @ApiResponse({ status: 201, description: 'Song added successfully' })
//   @ApiResponse({ status: 400, description: 'Invalid song data' })
//   addSong() {
//     return this.adminService.addSong();
//   }
// }
