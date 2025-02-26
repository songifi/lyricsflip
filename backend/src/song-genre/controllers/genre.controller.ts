import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Post(':genreId/preferences')
  @UseGuards(JwtAuthGuard)
  updatePreference(
    @CurrentUser() userId: string,
    @Param('genreId') genreId: string,
    @Body() performanceData: any,
  ) {
    return this.genreService.updateUserPreference(userId, genreId, performanceData);
  }

  @Get('preferences')
  @UseGuards(JwtAuthGuard)
  getUserPreferences(@CurrentUser() userId: string) {
    return this.genreService.getUserGenrePreferences(userId);
  }
}