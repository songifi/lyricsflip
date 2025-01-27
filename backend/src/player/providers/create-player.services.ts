import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player.entity';
import { Repository } from 'typeorm';
import { PlayerDTO } from '../dtos/create-player.dto';

@Injectable()
export class CreatePlayerProvider {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  public async createPlayer(playerDto: PlayerDTO) {
    let isEmailExist: Player;

    try {
      isEmailExist = await this.playerRepository.findOne({
        where: { email: playerDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error processing your request',
        },
      );
    }
    if (isEmailExist) {
      throw new BadRequestException('Player email already exist');
    }
    // Create the player
    let newPlayer = this.playerRepository.create(playerDto);
    try {
      newPlayer = await this.playerRepository.save(newPlayer);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error processing your request',
        },
      );
    }
    return [newPlayer];
  }
}
