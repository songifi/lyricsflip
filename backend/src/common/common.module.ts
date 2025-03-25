import { Module } from '@nestjs/common';
import { RateLimiterService } from './services/rate-limiter.service';

@Module({
  providers: [RateLimiterService],
  exports: [RateLimiterService],
})
export class CommonModule {}
