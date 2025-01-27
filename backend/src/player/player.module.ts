import { Module, forwardRef } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './providers/player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { CreatePlayerProvider } from './providers/create-player.services';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, CreatePlayerProvider],
  imports: [TypeOrmModule.forFeature([Player])],
  exports: [PlayerService],
})
export class PlayerModule {}
