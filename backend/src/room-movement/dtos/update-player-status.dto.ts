import { IsEnum, IsNotEmpty } from 'class-validator';
import { PlayerStatus } from '../entities/player.entity';

export class UpdatePlayerStatusDto {
  @IsEnum(PlayerStatus)
  @IsNotEmpty()
  status: PlayerStatus;
}
