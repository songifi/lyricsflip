import { Module } from '@nestjs/common';
import { WagerController } from './wager.controller';
import { WagerService } from './provider/wager.service';

@Module({
  controllers: [WagerController],
  providers: [WagerService]
})
export class WagerModule {}
