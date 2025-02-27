import * as winston from 'winston';

const { combine, timestamp, printf, colorize, align, json } = winston.format;

export const logFormats = {
  development: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    align(),
    printf(({ timestamp, level, message, context, ...meta }) => {
      return `[${timestamp}] ${level}: ${context ? `[${context}] ` : ''}${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    }),
  ),

  production: combine(timestamp(), json()),

  detailed: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    printf(({ timestamp, level, message, context, ...meta }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${context ? `[${context}] ` : ''}${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    }),
  ),
};

export const loggerConfig = {
  rotateConfig: {
    errorFile: {
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '20m',
      zippedArchive: true,
    },
    combinedFile: {
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '20m',
      zippedArchive: true,
    },
  },
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  },
};
