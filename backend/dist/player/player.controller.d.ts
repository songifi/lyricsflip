import { PlayerService } from './providers/player.service';
import { PlayerDTO } from './dtos/create-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    allPlayers(page?: number, limit?: number): Promise<{
        data: import("./player.entity").Player[];
        total: number;
        page: number;
        limit: number;
    }>;
    createPlayer(playerDto: PlayerDTO): Promise<import("./player.entity").Player[]>;
    viewPlayer(id: string): Promise<import("./player.entity").Player>;
    updatePlayer(id: string): Promise<import("./player.entity").Player>;
    deletePlayer(id: string): Promise<import("typeorm").DeleteResult>;
}
