import { IsUUID, IsNotEmpty } from 'class-validator';

export class JoinRoomDto {
  @IsUUID()
  @IsNotEmpty()
  playerId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;
}
