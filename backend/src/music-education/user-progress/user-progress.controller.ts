import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { UserProgressService } from './providers/user-progress.service';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') user: string) {
    return this.userProgressService.findByUser(user);
  }

  @Patch(':id')
  markComplete(@Param('id') id: number) {
    return this.userProgressService.markComplete(id);
  }
}
