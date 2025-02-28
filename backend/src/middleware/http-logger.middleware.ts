
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from '../logger/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, ip } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

     this.logger.log(
       `HTTP Request - Method: ${method}, URL: ${originalUrl}, Status: ${statusCode}, Content-Length: ${contentLength}, User-Agent: ${userAgent}, IP: ${ip}`,
       'HttpLogger',
     );

    });

    next();
  }
}
