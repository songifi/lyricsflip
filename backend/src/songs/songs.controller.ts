// src/songs/songs.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new song' })
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all songs' })
  findAll() {
    return this.songsService.findAll();
  }

  @Get()
  @ApiOperation({
    summary: 'Get songs with filtering, sorting, searching and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of songs successfully retrieved',
  })
  async getAllSongs(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('difficulty') difficultyId?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('q') searchQuery?: string,
  ) {
    return this.songsService.getAllSongs(
      searchQuery,
      { difficultyId },
      { field: sortBy, order: sortOrder },
      { page, limit },
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search songs' })
  search(@Query('q') query: string) {
    return this.songsService.searchSongs(query);
  }

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Get songs by genre' })
  findByGenre(@Param('genre') genre: string) {
    return this.songsService.findByGenre(genre);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random song' })
  getRandomSong() {
    return this.songsService.getRandomSong();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a song by id' })
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a song' })
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a song' })
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }

  @Post(':id/play')
  @ApiOperation({ summary: 'Increment play count' })
  incrementPlayCount(@Param('id') id: string) {
    return this.songsService.updatePlayCount(id);
  }
}
