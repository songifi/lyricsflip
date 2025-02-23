import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerUpService } from './power-up.service';
import { PowerUpController } from './power-up.controller';
import { PowerUp } from './entities/power-up.entity';
import { PowerUpPurchase } from './entities/power-up-purchase.entity';
import { PowerUpValidationMiddleware } from './power-up-validation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([PowerUp, PowerUpPurchase])],
  providers: [PowerUpService, PowerUpValidationMiddleware],
  controllers: [PowerUpController],
  exports: [PowerUpService, PowerUpValidationMiddleware],
})
export class PowerUpModule {}
