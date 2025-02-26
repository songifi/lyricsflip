import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
export declare class ArtistService {
    private readonly artistRepo;
    constructor(artistRepo: Repository<Artist>);
    findAll(): Promise<Artist[]>;
    findOne(id: number): Promise<Artist>;
    create(artist: Partial<Artist>): Promise<Partial<Artist> & Artist>;
}
