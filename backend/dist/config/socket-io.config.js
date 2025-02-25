"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIOAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: process.env.CLIENT_URL || '*',
                methods: ['GET', 'POST'],
                credentials: true,
            },
            pingInterval: 10000,
            pingTimeout: 5000,
            connectTimeout: 45000,
            maxHttpBufferSize: 1e6,
            transports: ['websocket', 'polling'],
        });
        return server;
    }
}
exports.SocketIOAdapter = SocketIOAdapter;
//# sourceMappingURL=socket-io.config.js.map