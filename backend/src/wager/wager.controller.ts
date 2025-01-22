import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WagerService } from './provider/wager.service';

@ApiTags('wager')
@Controller('wager')
export class WagerController {
  constructor(private readonly wagerService: WagerService) {}

  // controller for managing wager operations.
  @Post()
  @ApiOperation({ summary: 'Place a wager' })
  @ApiResponse({ status: 201, description: 'Wager successfully placed' })
  @ApiResponse({ status: 400, description: 'Invalid wager data' })
  placeWager() {
    return this.wagerService.placeWager();
  }

  // Retrieve wager history.
  @Get('history')
  @ApiOperation({ summary: 'Get wager history' })
  @ApiResponse({ status: 200, description: 'Wager history retrieved' })
  @ApiResponse({ status: 404, description: 'No wager history found' })
  getWagerHistory() {
    return this.wagerService.getWagerHistory();
  }

  // Claim winning.
  @Post('claim')
  @ApiOperation({ summary: 'Claim winnings' })
  @ApiResponse({ status: 200, description: 'Winnings successfully claimed' })
  @ApiResponse({ status: 400, description: 'No winnings to claim' })
  claimWinnings() {
    return this.wagerService.claimWinnings();
  }
}
