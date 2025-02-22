import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';

export class SocketIOAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingInterval: 10000, // How often to ping/pong (10 seconds)
      pingTimeout: 5000,   // How long to wait for pong (5 seconds)
      connectTimeout: 45000, // How long to wait for connection (45 seconds)
      maxHttpBufferSize: 1e6, // 1MB
      transports: ['websocket', 'polling'],
    });

    return server;
  }
}