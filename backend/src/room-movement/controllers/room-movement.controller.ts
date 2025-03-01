import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RoomMovementService } from '../services/room-movement.service';
import { JoinRoomDto } from '../dtos/join-room.dto';
import { LeaveRoomDto } from '../dtos/leave-room.dto';

@Controller('room-movement')
export class RoomMovementController {
  constructor(private roomMovementService: RoomMovementService) {}

  @Post('join')
  @HttpCode(HttpStatus.OK)
  async joinRoom(@Body() joinRoomDto: JoinRoomDto): Promise<any> {
    const result = await this.roomMovementService.joinRoom(joinRoomDto);
    return {
      success: true,
      message: 'Joined room successfully',
      data: {
        playerId: result.playerId,
        roomId: result.roomId,
        joinedAt: result.joinedAt,
      },
    };
  }

  @Post('leave')
  @HttpCode(HttpStatus.OK)
  async leaveRoom(@Body() leaveRoomDto: LeaveRoomDto): Promise<any> {
    const result = await this.roomMovementService.leaveRoom(leaveRoomDto);
    return {
      success: true,
      message: 'Left room successfully',
      data: {
        playerId: result.playerId,
        roomId: result.roomId,
        joinedAt: result.joinedAt,
        leftAt: result.leftAt,
      },
    };
  }

  @Get('room/:roomId/players')
  async getRoomPlayers(@Param('roomId') roomId: string): Promise<any> {
    return {
      roomId,
      players: await this.roomMovementService.getRoomPlayers(roomId),
    };
  }

  @Get('player/:playerId/history')
  async getPlayerRoomHistory(@Param('playerId') playerId: string): Promise<any> {
    return {
      playerId,
      history: await this.roomMovementService.getPlayerRoomHistory(playerId),
    };
  }
}
