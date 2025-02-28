import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLoggerService } from '../logger/custom-logger.service';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(private logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime();
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = seconds * 1000 + nanoseconds / 1000000;

        this.logger.log('Performance Metrics', {
          context: 'PerformanceInterceptor',
          route: req.url,
          method: req.method,
          duration: `${duration.toFixed(2)}ms`,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }
}
