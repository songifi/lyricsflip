import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { PlayerRoom } from '../entities/player-room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(PlayerRoom)
    private playerRoomRepository: Repository<PlayerRoom>,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({ where: { isActive: true } });
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id, isActive: true } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async create(data: Partial<Room>): Promise<Room> {
    const room = this.roomRepository.create(data);
    return this.roomRepository.save(room);
  }

  async update(id: string, data: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.roomRepository.update(id, { isActive: false });
  }

  async getCurrentPlayerCount(roomId: string): Promise<number> {
    return this.playerRoomRepository.count({
      where: {
        roomId,
        isActive: true,
      },
    });
  }

  async getActivePlayersInRoom(roomId: string): Promise<PlayerRoom[]> {
    return this.playerRoomRepository.find({
      where: {
        roomId,
        isActive: true,
      },
      relations: ['player'],
    });
  }
}
