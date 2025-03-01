import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReferralDto {
  @ApiProperty({ description: 'ID of the user creating the referral' })
  @IsString()
  referrerId: string;

  @ApiPropertyOptional({
    description: 'Additional metadata about the referral',
  })
  @IsOptional()
  @IsObject()
  metadata?: {
    conversionSource?: string;
    browserInfo?: string;
    ipAddress?: string;
  };
}
