import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RateLimiterService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async checkRateLimit(
    userId: string,
    action: string,
    maxAttempts: number,
    windowSeconds: number,
  ): Promise<void> {
    const key = `rate_limit:${action}:${userId}`;
    const attempts = await this.redis.incr(key);

    if (attempts === 1) {
      await this.redis.expire(key, windowSeconds);
    }

    if (attempts > maxAttempts) {
      throw new HttpException(
        'Rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
