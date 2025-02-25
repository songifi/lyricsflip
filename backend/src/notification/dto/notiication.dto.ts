import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationStatus } from '../enums/notifcation-status.enum';

export class NotificationDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @IsEnum(NotificationStatus)
  @IsNotEmpty()
  status: NotificationStatus;
}
