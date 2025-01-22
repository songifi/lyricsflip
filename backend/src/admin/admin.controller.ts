import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './providers/admin.service';

// controller for managing administrative operations.
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Retrieve platform statistics.
  @Get('stats')
  @ApiOperation({ summary: 'Get platform stats' })
  @ApiResponse({ status: 200, description: 'Platform stats retrieved' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPlatformStats() {
    return this.adminService.getPlatformStats();
  }

  //  Manage user accounts and permissions.
  @Post('users/manage')
  @ApiOperation({ summary: 'Manage users' })
  @ApiResponse({ status: 200, description: 'Users managed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  manageUsers() {
    return this.adminService.manageUsers();
  }

  //  Add a new song to the platform.
  @Post('songs/add')
  @ApiOperation({ summary: 'Add a new song' })
  @ApiResponse({ status: 201, description: 'Song added successfully' })
  @ApiResponse({ status: 400, description: 'Invalid song data' })
  addSong() {
    return this.adminService.addSong();
  }
}
