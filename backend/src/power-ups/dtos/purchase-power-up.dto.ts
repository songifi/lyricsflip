import { IsNumber, IsPositive } from 'class-validator';

export class PurchasePowerUpDto {
  @IsNumber()
  @IsPositive()
  powerUpId: number;
}
