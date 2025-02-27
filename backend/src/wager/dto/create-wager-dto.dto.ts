import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWagerDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Wager amount must be at least 0.01' })
  amount: number;

  // Assuming each wager is linked to a user
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  // And to a specific event or game
  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @IsOptional()
  @IsString()
  status?: string;
}
