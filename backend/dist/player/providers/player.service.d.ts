import { Player } from '../player.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PlayerDTO } from '../dtos/create-player.dto';
import { CreatePlayerProvider } from './create-player.services';
export declare class PlayerService {
    private readonly playerRepository;
    private readonly createPlayerProvider;
    constructor(playerRepository: Repository<Player>, createPlayerProvider: CreatePlayerProvider);
    allPlayers(page?: number, limit?: number): Promise<{
        data: Player[];
        total: number;
        page: number;
        limit: number;
    }>;
    viewPlayer(id: string): Promise<Player | null>;
    updatePlayer(id: string): Promise<Player | null>;
    deletePlayer(id: string): Promise<DeleteResult>;
    createPlayer(playerDto: PlayerDTO): Promise<Player[]>;
}
