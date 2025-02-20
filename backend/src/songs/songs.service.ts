import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
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

  async searchSongs(query: string) {
    return this.songsRepository
      .createQueryBuilder('song')
      .where('song.title ILIKE :query OR song.artist ILIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async updatePlayCount(id: string) {
    const song = await this.findOne(id);
    song.playCount += 1;
    return this.songsRepository.save(song);
  }

  async findByDifficulty(level: number) {
    return this.songsRepository.find({ where: { difficulty: level } });
  }

  async getRandomSong() {
    return this.songsRepository
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }
}