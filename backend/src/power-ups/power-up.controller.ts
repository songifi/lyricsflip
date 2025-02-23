import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PowerUpService } from './power-up.service';
import { CreatePowerUpDto } from './dto/create-power-up.dto';
import { PurchasePowerUpDto } from './dto/purchase-power-up.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.decorator';

@Controller('power-ups')
export class PowerUpController {
  constructor(private readonly powerUpService: PowerUpService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPowerUp(@Body() createPowerUpDto: CreatePowerUpDto) {
    return this.powerUpService.createPowerUp(createPowerUpDto);
  }

  @Post('purchase')
  @UseGuards(JwtAuthGuard)
  async purchasePowerUp(@User() user, @Body() purchaseDto: PurchasePowerUpDto) {
    return this.powerUpService.purchasePowerUp(user, purchaseDto);
  }

  @Get('active')
  @UseGuards(JwtAuthGuard)
  async getActivePowerUps(@User() user) {
    return this.powerUpService.getActivePowerUps(user);
  }

  @Post('use')
  @UseGuards(JwtAuthGuard)
  async usePowerUp(@User() user, @Body('powerUpId') powerUpId: number) {
    await this.powerUpService.usePowerUp(user, powerUpId);
    return { message: 'Power-up used successfully' };
  }
}
