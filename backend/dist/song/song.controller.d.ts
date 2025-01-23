import { SongService } from './providers/song.service';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    getSongs(): void;
    addSong(): void;
    updateSong(id: string): void;
    deleteSong(id: string): void;
}
