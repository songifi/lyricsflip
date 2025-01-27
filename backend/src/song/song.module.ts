import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './providers/song.service';

@Module({
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
