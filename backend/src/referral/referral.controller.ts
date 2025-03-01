import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ClaimReferralDto } from './dto/claim-referral.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guard/access-token/access-token.guard';

@ApiTags('Referrals')
@Controller('referrals')
@UseGuards(AccessTokenGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new referral code' })
  @ApiResponse({
    status: 201,
    description: 'Referral code created successfully',
  })
  create(@Body() createReferralDto: CreateReferralDto) {
    return this.referralService.create(createReferralDto);
  }

  @Post('claim')
  @ApiOperation({ summary: 'Claim a referral code' })
  @ApiResponse({
    status: 200,
    description: 'Referral code claimed successfully',
  })
  claim(@Body() claimReferralDto: ClaimReferralDto) {
    return this.referralService.claim(claimReferralDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all referrals' })
  @ApiResponse({ status: 200, description: 'Returns all referrals' })
  findAll() {
    return this.referralService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get referral analytics' })
  @ApiResponse({ status: 200, description: 'Returns referral analytics' })
  getAnalytics() {
    return this.referralService.getAnalytics();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get referrals for a specific user' })
  @ApiResponse({ status: 200, description: 'Returns user referrals' })
  findByUser(@Param('userId') userId: string) {
    return this.referralService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific referral' })
  @ApiResponse({ status: 200, description: 'Returns the referral' })
  findOne(@Param('id') id: string) {
    return this.referralService.findOne(id);
  }
}
