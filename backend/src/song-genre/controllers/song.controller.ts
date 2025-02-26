import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SongService } from '../services/song.service';
import { CreateSongDto } from '../dtos/create-song.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get('genre/:genreId')
  findByGenre(@Param('genreId') genreId: string) {
    return this.songService.findByGenre(genreId);
  }

  @Patch(':id/difficulty')
  @UseGuards(JwtAuthGuard)
  updateDifficulty(@Param('id') id: string, @Body() performanceData: any[]) {
    return this.songService.updateDifficulty(id, performanceData);
  }
}