import { Player } from '../player.entity';
import { Repository } from 'typeorm';
import { PlayerDTO } from '../dtos/create-player.dto';
export declare class CreatePlayerProvider {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    createPlayer(playerDto: PlayerDTO): Promise<Player[]>;
}
