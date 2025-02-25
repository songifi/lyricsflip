import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    // injecting the redis sercvice
    private redisService: RedisService
  ) {}

  async create(createSongDto: CreateSongDto) {
    const song = this.songsRepository.create(createSongDto);
    const savedSong = await this.songsRepository.save(song);
    await this.redisService.del('songs:all');
    return savedSong;
  }


  async findAll() {
    const cacheKey = 'songs:all';
    
    const cachedSongs = await this.redisService.get(cacheKey);
    if (cachedSongs) {
      return JSON.parse(cachedSongs);
    }
    
    const songs = await this.songsRepository.find();
    
    await this.redisService.set(cacheKey, JSON.stringify(songs), 3600);
    
    return songs;
  }

  async findOne(id: string) {
    const cacheKey = `song:${id}`;

    const cachedSong = await this.redisService.get(cacheKey);
    if (cachedSong) {
      return JSON.parse(cachedSong);
    }

    const song = await this.songsRepository.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    await this.redisService.set(cacheKey, JSON.stringify(song), 3600);

    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.findOne(id);
    Object.assign(song, updateSongDto);
    const updatedSong = await this.songsRepository.save(song);

    // Invalidate caches
    await this.redisService.del(`song:${id}`);
    await this.redisService.del('songs:all');

    return updatedSong;
  }

  async remove(id: string) {
    const song = await this.findOne(id);
    await this.songsRepository.remove(song);

    await this.redisService.del(`song:${id}`);
    await this.redisService.del('songs:all');

    return { message: `Song with ID ${id} deleted successfully` };
  }

  async findByGenre(genre: string) {
    const cacheKey = `songs:genre:${genre}`;

    const cachedSongs = await this.redisService.get(cacheKey);
    if (cachedSongs) {
      return JSON.parse(cachedSongs);
    }

    const songs = await this.songsRepository.find({ where: { genre } });

    await this.redisService.set(cacheKey, JSON.stringify(songs), 3600);

    return songs;
  }

  async searchSongs(query: string) {
    const cacheKey = `songs:search:${query}`;

    const cachedResults = await this.redisService.get(cacheKey);
    if (cachedResults) {
      return JSON.parse(cachedResults);
    }

    const songs = await this.songsRepository
      .createQueryBuilder('song')
      .where('song.title ILIKE :query OR song.artist ILIKE :query', {
        query: `%${query}%`,
      })
      .getMany();

    await this.redisService.set(cacheKey, JSON.stringify(songs), 1800);

    return songs;
  }

  async updatePlayCount(id: string) {
    const song = await this.findOne(id);
    song.playCount += 1;
    const updatedSong = await this.songsRepository.save(song);

    await this.redisService.set(`song:${id}`, JSON.stringify(updatedSong), 3600);

    return updatedSong;
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
