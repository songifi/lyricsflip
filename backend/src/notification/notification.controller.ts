import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './providers/notification.service';

// Controller for managing notifications.
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Retrieve all notifications.
  @Get()
  @ApiOperation({ 
    summary: 'Get notifications', 
    description: 'Retrieve all user notifications' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Notifications successfully retrieved' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error occurred' 
  })
  getNotifications() {
    return this.notificationService.getNotifications();
  }

  // Mark all notifications as read.
  @Post('mark-read')
  @ApiOperation({ 
    summary: 'Mark notifications as read', 
    description: 'Mark all user notifications as read' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Notifications successfully marked as read' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error occurred' 
  })
  markNotificationsRead() {
    return this.notificationService.markNotificationsRead();
  }
}