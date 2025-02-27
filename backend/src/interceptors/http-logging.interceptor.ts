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
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers, query, params, ip } = request;

    const requestData = {
      timestamp: new Date().toISOString(),
      method,
      url,
      body,
      query,
      params,
      ip,
      headers: {
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
        authorization: headers.authorization ? '[REDACTED]' : undefined,
      },
    };

    this.logger.log('Incoming Request', {
      context: 'HttpInterceptor',
      ...requestData,
    });

    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;

          this.logger.log('Request Completed', {
            context: 'HttpInterceptor',
            statusCode: response.statusCode,
            responseTime: `${delay}ms`,
            response: data,
          });
        },
        error: (error) => {
          const delay = Date.now() - now;

          this.logger.error('Request Failed', {
            context: 'HttpInterceptor',
            statusCode: error.status,
            responseTime: `${delay}ms`,
            error: {
              message: error.message,
              stack: error.stack,
            },
          });
        },
      }),
    );
  }
}
