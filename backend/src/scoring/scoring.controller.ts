import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { CreateScoringDto } from './dto/create-scoring.dto';
import { UpdateScoringDto } from './dto/update-scoring.dto';

@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Post()
  create(@Body() createScoringDto: CreateScoringDto) {
    return this.scoringService.create(createScoringDto);
  }

  @Get()
  findAll() {
    return this.scoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoringDto: UpdateScoringDto) {
    return this.scoringService.update(+id, updateScoringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoringService.remove(+id);
  }
}
