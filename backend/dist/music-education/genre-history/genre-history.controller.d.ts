import { GenreHistory } from './entities/genre-history.entity';
import { GenreHistoryService } from './providers/genre-history.service';
export declare class GenreHistoryController {
    private readonly genreHistoryService;
    constructor(genreHistoryService: GenreHistoryService);
    findAll(): Promise<GenreHistory[]>;
    findOne(id: number): Promise<GenreHistory>;
    create(genreHistory: Partial<GenreHistory>): Promise<Partial<GenreHistory> & GenreHistory>;
}
