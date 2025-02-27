
import * as Transport from 'winston-transport';

export class CustomTransport extends Transport {
  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts);
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Process the log entry
    const { level, message, ...meta } = info;

    // Implement your custom logging logic here
    // Example: Send to a custom service, database, etc.

    callback();
  }
}
