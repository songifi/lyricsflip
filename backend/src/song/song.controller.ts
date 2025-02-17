import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SongService } from './providers/song.service';
//import { CreateSongDto } from './dto/create-song.dto';
//import { UpdateSongDto } from './dto/update-song.dto';

// Controller for managing songs.
@ApiTags('song')
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // Retrieve the list of available songs.
  @Get()
  @ApiOperation({ 
    summary: 'Get all songs', 
    description: 'Retrieve a list of all available songs' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of songs successfully retrieved' 
  })
  getSongs() {
    return this.songService.getSongs();
  }

  // Add a new song.
  @Post()
  @ApiOperation({ 
    summary: 'Add a new song', 
    description: 'Create and add a new song to the collection' 
  })
  //@ApiBody({ type: CreateSongDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Song successfully added' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input' 
  })
  addSong() {
    return this.songService.addSong();
  }

  // Update a song.
  @Put(':id')
  @ApiOperation({ 
    summary: 'Update a song', 
    description: 'Update an existing song by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the song to be updated', 
    type: 'string' 
  })
  //@ApiBody({ type: UpdateSongDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Song successfully updated' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Song not found' 
  })
  updateSong(
    @Param('id') id: string, 
   // @Body() updateSongDto: UpdateSongDto
  ) {
    return this.songService.updateSong();
  }

  // Delete a song
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a song', 
    description: 'Remove a song from the collection by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the song to be deleted', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Song successfully deleted' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Song not found' 
  })
  deleteSong(@Param('id') id: string) {
    return this.songService.deleteSong();
  }
}