import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Room } from './entities/room.entity';
import { Player } from './entities/player.entity';
import { PlayerRoom } from './entities/player-room.entity';
import { RoomService } from './services/room.service';
import { PlayerService } from './services/player.service';
import { RoomMovementService } from './services/room-movement.service';
import { RoomController } from './controllers/room.controller';
import { PlayerController } from './controllers/player.controller';
import { RoomMovementController } from './controllers/room-movement.controller';
import { RoomMovementGateway } from './gateways/room-movement.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Player, PlayerRoom]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [RoomController, PlayerController, RoomMovementController],
  providers: [RoomService, PlayerService, RoomMovementService, RoomMovementGateway],
  exports: [RoomService, PlayerService, RoomMovementService],
})
export class RoomMovementModule {}
