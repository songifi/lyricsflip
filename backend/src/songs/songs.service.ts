import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { RedisService } from 'src/redis/redis.service';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    // injecting the redis sercvice
    private redisService: RedisService,
    private readonly difficultyRepository: Repository<Difficulty>,
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

  async searchSongs(
    searchQuery: string,
    filters?: { difficultyId: string },
    sort?: { field: string, order: 'ASC' | 'DESC' }
  ) {
    const cacheKey = `songs:search:${searchQuery}`;
    const cachedResults = await this.redisService.get(cacheKey);
    if (cachedResults) {
      return JSON.parse(cachedResults)
    }

    const query = this.songsRepository.createQueryBuilder('songs')

    if (filters?.difficultyId) {
      query.andWhere('song.difficultyId = :difficultyId', { difficultyId: filters.difficultyId })
      .getMany();
    }
    
    // Integrated search
    if (searchQuery) {
      query.andWhere(
        '(song.title ILIKE :searchQuery OR song.artist ILIKE :searchQuery)',
        { searchQuery: `%${searchQuery}%` }
      ).getMany();
    }
    
    if (sort?.field) {
      query.orderBy(`song.${sort.field}`, sort.order || 'ASC').getMany();
    }

    await this.redisService.set(cacheKey, JSON.stringify(query), 1800);

    return query
  }

  async updatePlayCount(id: string) {
    const song = await this.findOne(id);
    song.playCount += 1;
    const updatedSong = await this.songsRepository.save(song);

    await this.redisService.set(`song:${id}`, JSON.stringify(updatedSong), 3600);

    return updatedSong;
  }

  async findByDifficulty(level: number) {
    const difficulty = await this.difficultyRepository.findOne({ where: { value: level } });

    if (!difficulty) {
      throw new NotFoundException(`Difficulty level ${level} not found`)
    }

    return this.songsRepository.find({
      where: { difficultyId: difficulty.id }
    })
  }

  async getRandomSong() {
    return this.songsRepository
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }
}
