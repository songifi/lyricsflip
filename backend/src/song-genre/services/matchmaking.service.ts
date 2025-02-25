import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import { GenreService } from './genre.service';

@Injectable()
export class MatchmakingService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    private genreService: GenreService,
  ) {}

  async findSongsForUser(userId: string, targetDifficulty: number): Promise<Song[]> {
    // Get user preferences
    const preferences = await this.genreService.getUserGenrePreferences(userId);
    
    // Sort genres by preference
    const sortedGenreIds = preferences
      .sort((a, b) => b.preferenceScore - a.preferenceScore)
      .map(pref => pref.genre.id);
    
    // Find songs within difficulty range, prioritizing preferred genres
    const difficultyRange = 0.5;
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.genre', 'genre')
      .leftJoinAndSelect('song.tags', 'tags')
      .where('song.calculatedDifficulty BETWEEN :minDifficulty AND :maxDifficulty', {
        minDifficulty: targetDifficulty - difficultyRange,
        maxDifficulty: targetDifficulty + difficultyRange,
      })
      .orderBy(`CASE 
        ${sortedGenreIds.map((id, index) => `WHEN genre.id = '${id}' THEN ${index}`).join(' ')}
        ELSE 999 
        END`)      
      .addOrderBy('song.playCount', 'ASC')
      .take(10)
      .getMany();
    
    return songs;
  }
}
