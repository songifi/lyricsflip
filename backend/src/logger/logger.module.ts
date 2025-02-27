import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
