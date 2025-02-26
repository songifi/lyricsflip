
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { IncomingWebhook } from '@slack/webhook';


const { combine, timestamp, printf, colorize, align } = winston.format;


@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  private slackWebhook: IncomingWebhook;

  constructor() {
    const customFormat = printf(
      ({ level, message, timestamp, context, ...metadata }) => {
        return `[${timestamp}] ${level.toUpperCase().padEnd(7)}: ${context ? `[${context}] ` : ''}${message} ${
          Object.keys(metadata).length ? JSON.stringify(metadata, null, 2) : ''
        }`;
      },
    );

    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        align(),
        customFormat,
      ),

      transports: [
        // Error logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '30d', // Keep logs for 30 days
          maxSize: '20m', // 20MB
          zippedArchive: true,
        }),

        // Combined logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '30d',
          maxSize: '20m',
          zippedArchive: true,
        }),

        // Console output for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),

        new winston.transports.Console({
          format: combine(
            colorize(),
            timestamp(),
            printf(
              ({ timestamp, level, message }) =>
                `${timestamp} ${level}: ${message}`,
            ),
          ),
        }),
      ],
    });
  }

  private async sendToSlack(level: string, message: string, meta?: any) {
    if (level === 'error' || level === 'critical') {
      await this.slackWebhook.send({
        text: `*${level.toUpperCase()}*: ${message}`,
      });
    }
  }

  private async sendToExternalService(logData: any) {
    // Implement your external service logic here
    // Example: Send to logging service API
  }

 

  private formats = {
    json: combine(timestamp(), winston.format.json()),

    simple: combine(
      timestamp(),
      printf(
        ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
      ),
    ),

    detailed: combine(
      timestamp(),
      printf(
        ({ timestamp, level, message, context, trace, ...meta }) => `
        ${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message}
        ${trace ? `\nStack: ${trace}` : ''}
        ${Object.keys(meta).length ? `\nMetadata: ${JSON.stringify(meta, null, 2)}` : ''}
      `,
      ),
    ),
  };
  

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
