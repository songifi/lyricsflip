import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreatePowerUpDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  duration: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
