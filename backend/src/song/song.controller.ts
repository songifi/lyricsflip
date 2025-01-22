import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SongService } from './providers/song.service';

// Controller for managing songs.
@ApiTags('song')
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // Retrieve the list of available songs.
  @Get()
  @ApiOperation({ summary: 'Get all songs' })
  @ApiResponse({ status: 200, description: 'List of songs retrieved' })
  getSongs() {
    return this.songService.getSongs();
  }

  // Add a new song.
  @Post()
  @ApiOperation({ summary: 'Add a new song' })
  @ApiResponse({ status: 201, description: 'Song successfully added' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  addSong() {
    return this.songService.addSong();
  }

  // update a song.
  @Put(':id')
  @ApiOperation({ summary: 'Update a song' })
  @ApiParam({ name: 'id', description: 'ID of the song to be updated' })
  @ApiResponse({ status: 200, description: 'Song successfully updated' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  updateSong() {
    return this.songService.updateSong();
  }

  // delete a song
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a song' })
  @ApiParam({ name: 'id', description: 'ID of the song to be deleted' })
  @ApiResponse({ status: 200, description: 'Song successfully deleted' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  deleteSong() {
    return this.songService.deleteSong();
  }
}
