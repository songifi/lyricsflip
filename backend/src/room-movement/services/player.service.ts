import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player, PlayerStatus } from '../entities/player.entity';
import { PlayerRoom } from '../entities/player-room.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PlayerRoom)
    private playerRoomRepository: Repository<PlayerRoom>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findById(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  async create(data: Partial<Player>): Promise<Player> {
    const player = this.playerRepository.create(data);
    return this.playerRepository.save(player);
  }

  async updateStatus(id: string, status: PlayerStatus): Promise<Player> {
    await this.playerRepository.update(id, { status });
    return this.findById(id);
  }

  async getCurrentRoom(playerId: string): Promise<PlayerRoom | null> {
    return this.playerRoomRepository.findOne({
      where: {
        playerId,
        isActive: true,
      },
      relations: ['room'],
    });
  }

  async getPreviousRooms(playerId: string): Promise<PlayerRoom[]> {
    return this.playerRoomRepository.find({
      where: {
        playerId,
        isActive: false,
      },
      relations: ['room'],
      order: {
        leftAt: 'DESC',
      },
    });
  }
}
