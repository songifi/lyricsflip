import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimReferralDto {
  @ApiProperty({ description: 'The referral code to claim' })
  @IsString()
  referralCode: string;

  @ApiProperty({ description: 'ID of the user claiming the referral' })
  @IsString()
  refereeId: string;
}
