import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PlayerService } from '../services/player.service';
import { Player } from '../entities/player.entity';
import { UpdatePlayerStatusDto } from '../dtos/update-player-status.dto';

@Controller('players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Player> {
    return this.playerService.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Player>): Promise<Player> {
    return this.playerService.create(data);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePlayerStatusDto,
  ): Promise<Player> {
    return this.playerService.updateStatus(id, dto.status);
  }

  @Get(':id/current-room')
  async getCurrentRoom(@Param('id') id: string): Promise<any> {
    const playerRoom = await this.playerService.getCurrentRoom(id);
    if (!playerRoom) return null;
    
    return {
      roomId: playerRoom.roomId,
      roomName: playerRoom.room.name,
      joinedAt: playerRoom.joinedAt,
    };
  }
}
