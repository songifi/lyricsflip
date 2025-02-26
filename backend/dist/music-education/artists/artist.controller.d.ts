import { ArtistService } from './providers/artist.service';
import { Artist } from './entities/artist.entity';
export declare class ArtistController {
    private readonly artistService;
    constructor(artistService: ArtistService);
    findAll(): Promise<Artist[]>;
    findOne(id: number): Promise<Artist>;
    create(artist: Partial<Artist>): Promise<Partial<Artist> & Artist>;
}
