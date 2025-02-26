import { Repository } from 'typeorm';
import { GenreHistory } from '../entities/genre-history.entity';
export declare class GenreHistoryService {
    private readonly genreRepo;
    constructor(genreRepo: Repository<GenreHistory>);
    findAll(): Promise<GenreHistory[]>;
    findOne(id: number): Promise<GenreHistory>;
    create(genreHistory: Partial<GenreHistory>): Promise<Partial<GenreHistory> & GenreHistory>;
}
