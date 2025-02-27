import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { UserGenrePreference } from '../entities/user-genre-preference.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(UserGenrePreference)
    private userPreferenceRepository: Repository<UserGenrePreference>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async updateUserPreference(userId: string, genreId: string, performanceData: any): Promise<UserGenrePreference> {
    let preference = await this.userPreferenceRepository.findOne({
      where: { userId, genre: { id: genreId } },
      relations: ['genre'],
    });

    if (!preference) {
        const genre = await this.genreRepository.findOne({ where: { id: genreId } });
      preference = this.userPreferenceRepository.create({
        userId,
        genre,
        preferenceScore: 0,
        playCount: 0,
        averagePerformance: 0,
      });
    }

    // Update stats
    preference.playCount += 1;
    
    // Update average performance
    const totalPerformance = preference.averagePerformance * (preference.playCount - 1) + performanceData.score;
    preference.averagePerformance = totalPerformance / preference.playCount;
    
    // Update preference score (based on play count and performance)
    preference.preferenceScore = 
      (preference.playCount * 0.1) + 
      (preference.averagePerformance * 0.01) + 
      (performanceData.enjoymentRating || 0);

    return this.userPreferenceRepository.save(preference);
  }

  async getUserGenrePreferences(userId: string): Promise<UserGenrePreference[]> {
    return this.userPreferenceRepository.find({
      where: { userId },
      relations: ['genre'],
      order: { preferenceScore: 'DESC' },
    });
  }
}
