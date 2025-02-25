import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>
  ) {}

  create(createSongDto: CreateSongDto) {
    const song = this.songsRepository.create(createSongDto);
    return this.songsRepository.save(song);
  }

  findAll() {
    return this.songsRepository.find();
  }

  async findOne(id: string) {
    const song = await this.songsRepository.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.findOne(id);
    Object.assign(song, updateSongDto);
    return this.songsRepository.save(song);
  }

  async remove(id: string) {
    const song = await this.findOne(id);
    return this.songsRepository.remove(song);
  }

  async findByGenre(genre: string) {
    return this.songsRepository.find({ where: { genre } });
  }

  async searchSongs(
    searchQuery: string,
    filters?: { difficultyId: string },
    sort?: { field: string, order: 'ASC' | 'DESC' }
  ) {
    const query = this.songsRepository.createQueryBuilder('song')

    // FIlters (based on difficulty)

    if (filters?.difficultyId) {
      query.andWhere('song.difficultyId = :difficultyId', { difficultyId: filters?.difficultyId })
    }

    if (searchQuery) {
      query.andWhere(
        '(song.title ILIKE :searchQuery OR song.artist ILIKE :searchQuery)',
        { searchQuery: `%${searchQuery}%` }
      )
    }

    // Sort (based on difficulty)

    if (sort?.field) {
      query.orderBy(`song.${sort.field}`, sort.order || 'ASC');
    }

    return query.getMany();
  }

  async updatePlayCount(id: string) {
    const song = await this.findOne(id);
    song.playCount += 1;
    return this.songsRepository.save(song);
  }

  async findByDifficulty(level: number) {
    const difficulty = await this.difficultyRepository.findOne({
      where: { value: level }
    });
    
    if (!difficulty) {
      throw new NotFoundException(`Difficulty level ${level} not found`);
    }

    return this.songsRepository.find({ where: { difficultyId: difficulty.id } });
  }

  async getRandomSong() {
    return this.songsRepository
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }
}