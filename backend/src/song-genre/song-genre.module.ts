import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './controllers/song.controller';
import { GenreController } from './controllers/genre.controller';
import { SongService } from './services/song.service';
import { GenreService } from './services/genre.service';
import { MatchmakingService } from './services/matchmaking.service';
import { Song } from './entities/song.entity';
import { Genre } from './entities/genre.entity';
import { Tag } from './entities/tag.entity';
import { UserGenrePreference } from './entities/user-genre-preference.entity';
import { GenreChallenge } from './entities/genre-challenge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Song,
      Genre,
      Tag,
      UserGenrePreference,
      GenreChallenge,
    ]),
  ],
  controllers: [SongController, GenreController],
  providers: [SongService, GenreService, MatchmakingService],
  exports: [SongService, GenreService, MatchmakingService],
})
export class SongGenreModule {}