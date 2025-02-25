import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import { Genre } from '../entities/genre.entity';
import { Tag } from '../entities/tag.entity';
import { CreateSongDto } from '../dtos/create-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const genre = await this.genreRepository.findOne({ where: { id: createSongDto.genreId } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${createSongDto.genreId} not found`);
    }

    let tags = [];
    if (createSongDto.tagIds && createSongDto.tagIds.length > 0) {
      tags = await this.tagRepository.findByIds(createSongDto.tagIds);
    }

    const song = this.songRepository.create({
      ...createSongDto,
      genre,
      tags,
    });

    // Calculate difficulty
    song.calculatedDifficulty = await this.calculateDifficulty(song, genre);

    return this.songRepository.save(song);
  }

  async calculateDifficulty(song: Song, genre: Genre): Promise<number> {
    // Base difficulty calculation
    let difficulty = song.baseDifficulty;

    // Apply genre multiplier
    difficulty *= genre.difficultyMultiplier;

    // Apply difficulty factors
    const factors = song.difficultyFactors;
    if (factors.tempo) {
      difficulty += factors.tempo * 0.2;
    }
    if (factors.complexity) {
      difficulty += factors.complexity * 0.3;
    }
    if (factors.technicalElements) {
      difficulty += factors.technicalElements * 0.25;
    }

    return Math.max(0.1, Math.min(10, difficulty));
  }

  async findByGenre(genreId: string): Promise<Song[]> {
    return this.songRepository.find({
      where: { genre: { id: genreId } },
      relations: ['genre', 'tags'],
    });
  }

  async updateDifficulty(songId: string, userPerformances: any[]): Promise<Song> {
    const song = await this.songRepository.findOne({ where: { id: songId }, relations: ['genre'] });
    if (!song) {
      throw new NotFoundException(`Song with ID ${songId} not found`);
    }

    // Update difficulty based on user performances
    // This is a simplified implementation
    const averagePerformance = userPerformances.reduce((sum, perf) => sum + perf.score, 0) / userPerformances.length;
    const completionRate = userPerformances.filter(perf => perf.completed).length / userPerformances.length;

    // Update song stats
    song.averageScore = averagePerformance;
    song.completionRate = completionRate;
    song.playCount += userPerformances.length;

    // Adjust difficulty (if scores are too high, increase difficulty)
    if (averagePerformance > 90 && completionRate > 0.8) {
      song.baseDifficulty += 0.2;
    } else if (averagePerformance < 60 && completionRate < 0.4) {
      song.baseDifficulty -= 0.1;
    }

    // Recalculate difficulty
    song.calculatedDifficulty = await this.calculateDifficulty(song, song.genre);

    return this.songRepository.save(song);
  }
}