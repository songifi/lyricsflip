import { IsUUID, IsNotEmpty } from 'class-validator';

export class LeaveRoomDto {
  @IsUUID()
  @IsNotEmpty()
  playerId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;
}
