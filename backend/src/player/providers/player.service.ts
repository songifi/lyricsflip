import { Injectable } from '@nestjs/common';
import { Player } from '../player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PlayerDTO } from '../dtos/create-player.dto';
import { CreatePlayerProvider } from './create-player.services';

@Injectable()
export class PlayerService {
  constructor(
    /*
     * Inject player repository
     */
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    //Inject create player provider
    private readonly createPlayerProvider: CreatePlayerProvider,
  ) {}

  public async allPlayers(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Player[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.playerRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  public async viewPlayer(id: string): Promise<Player | null> {
    const data = await this.playerRepository.findOneBy({ id });
    return data;
  }

  public async updatePlayer(id: string): Promise<Player | null> {
    const data = await this.playerRepository.findOneBy({ id });
    return data;
  }

  public async deletePlayer(id: string): Promise<DeleteResult> {
    const data = await this.playerRepository.delete({ id });
    return data;
  }

  public async createPlayer(playerDto: PlayerDTO) {
    const data = await this.createPlayerProvider.createPlayer(playerDto);
    return data;
  }
}
