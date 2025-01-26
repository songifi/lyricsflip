import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PlayerService } from './providers/player.service';
import { PlayerDTO } from './dtos/create-player.dto';

// Player Controller
@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  // All Players
  @Get()
  @ApiOperation({
    summary: 'All players',
    description: 'View all players',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Number of items per page (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Players fetched',
  })
  allPlayers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.playerService.allPlayers(Number(page), Number(limit));
  }

  // Create player
  @Post()
  @ApiOperation({
    summary: 'Create player',
    description: 'Create a new player',
  })
  @ApiBody({ type: PlayerDTO })
  @ApiResponse({
    status: 201,
    description: 'Player created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid player data',
  })
  createPlayer(@Body() playerDto: PlayerDTO) {
    return this.playerService.createPlayer(playerDto);
  }

  // Read(View) player
  @Get(':id')
  @ApiOperation({
    summary: 'View player',
    description: 'View a player detail',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the player',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Player fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Player not found',
  })
  viewPlayer(@Param('id') id: string) {
    return this.playerService.viewPlayer(id);
  }

  // Update player
  @Put(':id')
  @ApiOperation({
    summary: 'Update player',
    description: 'Update player detail',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the player',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Player updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid player data',
  })
  updatePlayer(@Param('id') id: string) {
    return this.playerService.updatePlayer(id);
  }

  // Delete player
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete player',
    description: 'Delete player',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the player',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Player deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Player not found',
  })
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
