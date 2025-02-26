import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';
export declare class SocketIOAdapter extends IoAdapter {
    constructor(app: INestApplication);
    createIOServer(port: number, options?: ServerOptions): any;
}
