// src/practice/controllers/user-progress.controller.ts
import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserProgressService } from '../services/user-progress.service';
import { Genre } from '../enums/genre.enum';

@ApiTags('practice-progress')
@ApiBearerAuth()
@Controller('practice/progress')
@UseGuards(JwtAuthGuard)
export class UserProgressController {
  constructor(private readonly progressService: UserProgressService) {}

  @Get()
  getUserProgress(@Request() req, @Query('genre') genre?: Genre) {
    return this.progressService.getUserProgress(req.user.id, genre);
  }
}
