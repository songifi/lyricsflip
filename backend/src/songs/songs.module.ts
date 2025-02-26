// src/songs/songs.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { RedisService } from 'src/redis/redis.service';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Difficulty]), RedisService],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}