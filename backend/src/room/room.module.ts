import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomMembershipService } from './room-membership.service';
import { PlayerPresenceService } from './player-presence.service';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoundGateway } from './round.gateway';
import { Room } from './entities/room.entity';
import { PlayerRoom } from './entities/player-room.entity';
import { RoundPlayer } from './entities/round-player.entity';
import { Player } from '../player/player.entity';
import { WsAuthenticator } from '../auth/ws-authenticator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, PlayerRoom, RoundPlayer, Player]),
  ],
  controllers: [RoomController],
  providers: [
    RoomService,
    RoomMembershipService,
    PlayerPresenceService,
    RoomGateway,
    RoundGateway,
    WsAuthenticator,
  ],
  exports: [
    RoomService,
    RoomMembershipService,
    PlayerPresenceService,
    RoundGateway,
    WsAuthenticator,
  ],
})
export class RoomModule {}