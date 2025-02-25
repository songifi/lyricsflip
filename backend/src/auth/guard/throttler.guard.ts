import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected generateKey(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user ? `user-${user.id}` : request.ip; // Use user ID if authenticated, else use IP
  }
}
