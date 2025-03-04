import {
  DefaultValuePipe,
  Injectable,
  NotFoundException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { RedisService } from 'src/redis/redis.service';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { SongService } from 'src/song/providers/song.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    private readonly songService: SongService,
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
    const songs = await this.songsRepository.find();
    return songs;
  }
  async getAllSongs(
    searchQuery?: string,
    filters?: { difficultyId?: string },
    sortOptions?: { field?: string; order?: 'ASC' | 'DESC' },
    pagination?: { page: number; limit: number },
  ): Promise<Song[]> {
    // Destructure pagination parameters with default values
    const { page = 1, limit = 20 } = pagination || {};

    // Build a unique cache key using all parameters
    const cacheKey = `songs:all:difficulty:${filters?.difficultyId || 'all'}:q:${searchQuery || 'all'}:sort:${sortOptions?.field || 'none'}:${sortOptions?.order || 'none'}:limit:${limit}:page:${page}`;

    // Check for cached results
    const cachedSongs = await this.redisService.get(cacheKey);
    if (cachedSongs) {
      return JSON.parse(cachedSongs);
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build query options for TypeORM
    const queryOptions: any = {
      skip: offset,
      take: limit,
      where: {},
    };

    // Apply filtering if provided
    if (filters?.difficultyId) {
      queryOptions.where.difficultyId = filters.difficultyId;
    }

    // Apply search (example: searching by title)
    if (searchQuery) {
      queryOptions.where.title = Like(`%${searchQuery}%`);
    }

    // Apply sorting if provided
    if (sortOptions?.field) {
      queryOptions.order = { [sortOptions.field]: sortOptions.order || 'ASC' };
    }

    // Execute the query to get songs
    const songs = await this.songsRepository.find(queryOptions);

    // Cache the results for 1 hour (3600 seconds)
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
    sort?: { field: string; order: 'ASC' | 'DESC' },
  ) {
    const cacheKey = `songs:search:${searchQuery}`;
    const cachedResults = await this.redisService.get(cacheKey);
    if (cachedResults) {
      return JSON.parse(cachedResults);
    }

    const query = this.songsRepository.createQueryBuilder('songs');

    if (filters?.difficultyId) {
      query
        .andWhere('song.difficultyId = :difficultyId', {
          difficultyId: filters.difficultyId,
        })
        .getMany();
    }

    // Integrated search
    if (searchQuery) {
      query
        .andWhere(
          '(song.title ILIKE :searchQuery OR song.artist ILIKE :searchQuery)',
          { searchQuery: `%${searchQuery}%` },
        )
        .getMany();
    }

    if (sort?.field) {
      query.orderBy(`song.${sort.field}`, sort.order || 'ASC').getMany();
    }

    await this.redisService.set(cacheKey, JSON.stringify(query), 1800);

    return query;
  }

  async updatePlayCount(id: string) {
    const song = await this.findOne(id);
    song.playCount += 1;
    const updatedSong = await this.songsRepository.save(song);

    await this.redisService.set(
      `song:${id}`,
      JSON.stringify(updatedSong),
      3600,
    );

    return updatedSong;
  }

  async findByDifficulty(level: number) {
    const difficulty = await this.difficultyRepository.findOne({
      where: { value: level },
    });

    if (!difficulty) {
      throw new NotFoundException(`Difficulty level ${level} not found`);
    }

    return this.songsRepository.find({
      where: { difficultyId: difficulty.id },
    });
  }

  async getRandomSong() {
    return this.songsRepository
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }
}
