import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArtistService } from './providers/artist.service';
import { Artist } from './entities/artist.entity';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() artist: Partial<Artist>) {
    return this.artistService.create(artist);
  }
}
