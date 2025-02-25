import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    create(createSongDto: CreateSongDto): Promise<import("./entities/song.entity").Song[]>;
    findAll(): Promise<import("./entities/song.entity").Song[]>;
    getSongs(difficultyId?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC', searchQuery?: string): Promise<import("./entities/song.entity").Song[]>;
    search(query: string): Promise<import("./entities/song.entity").Song[]>;
    findByGenre(genre: string): Promise<import("./entities/song.entity").Song[]>;
    getRandomSong(): Promise<import("./entities/song.entity").Song>;
    findOne(id: string): Promise<import("./entities/song.entity").Song>;
    update(id: string, updateSongDto: UpdateSongDto): Promise<import("./entities/song.entity").Song>;
    remove(id: string): Promise<import("./entities/song.entity").Song>;
    incrementPlayCount(id: string): Promise<import("./entities/song.entity").Song>;
}
