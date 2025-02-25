import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
export declare class SongsService {
    private songsRepository;
    private difficultyRepository;
    constructor(songsRepository: Repository<Song>, difficultyRepository: Repository<Difficulty>);
    create(createSongDto: CreateSongDto): Promise<Song[]>;
    findAll(): Promise<Song[]>;
    findOne(id: string): Promise<Song>;
    update(id: string, updateSongDto: UpdateSongDto): Promise<Song>;
    remove(id: string): Promise<Song>;
    findByGenre(genre: string): Promise<Song[]>;
    searchSongs(searchQuery: string, filters?: {
        difficultyId: string;
    }, sort?: {
        field: string;
        order: 'ASC' | 'DESC';
    }): Promise<Song[]>;
    updatePlayCount(id: string): Promise<Song>;
    findByDifficulty(level: number): Promise<Song[]>;
    getRandomSong(): Promise<Song>;
}
