import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RewardService } from './providers/reward.service';

// Controller for managing rewards.
@ApiTags('reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  // Retrieve the list of available rewards.
  @Get()
  @ApiOperation({ summary: 'Get available rewards' })
  @ApiResponse({ status: 200, description: 'List of rewards retrieved' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getRewards() {
    return this.rewardService.getRewards();
  }

  // Claim a specific reward.
  //  claim - reward claim details.
  @Post('claim')
  @ApiOperation({ summary: 'Claim a reward' })
  @ApiResponse({ status: 200, description: 'Reward successfully claimed' })
  @ApiResponse({ status: 400, description: 'Invalid reward claim details' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  claimReward() {
    return this.rewardService.claimReward();
  }
}
