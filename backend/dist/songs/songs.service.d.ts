import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
export declare class SongsService {
    private songsRepository;
    constructor(songsRepository: Repository<Song>);
    create(createSongDto: CreateSongDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    findOne(id: string): Promise<Song>;
    update(id: string, updateSongDto: UpdateSongDto): Promise<Song>;
    remove(id: string): Promise<Song>;
    findByGenre(genre: string): Promise<Song[]>;
    searchSongs(query: string): Promise<Song[]>;
    updatePlayCount(id: string): Promise<Song>;
    findByDifficulty(level: number): Promise<Song[]>;
    getRandomSong(): Promise<Song>;
}
