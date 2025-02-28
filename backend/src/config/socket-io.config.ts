import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';

import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

export class SocketIOAdapter implements WebSocketAdapter {
  private io: Server;

  constructor(private app: INestApplicationContext) {}

  create(port: number, options?: any): any {
    this.io = new Server(port, options);
    return this.io;
  }

  bindClientConnect(server: Server, callback: (socket: Socket) => void) {
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: Socket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    handlers.forEach(({ message, callback }) => {
      fromEvent(client, message)
        .pipe(
          mergeMap(data => process(callback(data))),
          takeUntil(fromEvent(client, 'disconnect')),
        )
        .subscribe(response => client.emit(message, response));
    });
  }

  close(server: Server) {
    server.close();
  }
}

// export class SocketIOAdapter extends IoAdapter {
//   constructor(app: INestApplication) {
//     super(app);
//   }

//   createIOServer(port: number, options?: ServerOptions) {
//     const server = super.createIOServer(port, {
//       ...options,
//       cors: {
//         origin: process.env.CLIENT_URL || '*',
//         methods: ['GET', 'POST'],
//         credentials: true,
//       },
//       pingInterval: 10000, // How often to ping/pong (10 seconds)
//       pingTimeout: 5000,   // How long to wait for pong (5 seconds)
//       connectTimeout: 45000, // How long to wait for connection (45 seconds)
//       maxHttpBufferSize: 1e6, // 1MB
//       transports: ['websocket', 'polling'],
//     });

//     return server;
//   }
// }