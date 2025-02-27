import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends Logger {
  constructor() {
    super();
  }

  setContext(context: string) {
    (context);
  }

  error(message: string, context?: any) {
    if (context) {
      super.error(`${message}: ${JSON.stringify(context)}`);
    } else {
      super.error(message);
    }
  }

  warn(message: string, context?: any) {
    if (context) {
      super.warn(`${message}: ${JSON.stringify(context)}`);
    } else {
      super.warn(message);
    }
  }

  log(message: string, context?: any) {
    if (context) {
      super.log(`${message}: ${JSON.stringify(context)}`);
    } else {
      super.log(message);
    }
  }
}
