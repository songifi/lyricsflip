import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { Room } from '../entities/room.entity';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Room> {
    return this.roomService.findById(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() data: Partial<Room>): Promise<Room> {
    return this.roomService.create(data);
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: Partial<Room>): Promise<Room> {
    return this.roomService.update(id, data);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.roomService.delete(id);
  }

  @Get(':id/player-count')
  async getPlayerCount(@Param('id') id: string): Promise<{ count: number; capacity: number }> {
    const room = await this.roomService.findById(id);
    const count = await this.roomService.getCurrentPlayerCount(id);
    return { count, capacity: room.capacity };
  }
}
