import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';  // Correct import
import { createServer } from 'http';
import { GameGateway } from './gamegateway.gateway';

describe('GameGateway', () => {
  let app: INestApplication;
  let gateway: GameGateway;
  let clientSocket: Socket;
  let httpServer: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [GameGateway],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpServer = createServer();
    gateway = moduleFixture.get<GameGateway>(GameGateway);

    await app.init();
    httpServer.listen(3000);

    clientSocket = io('http://localhost:3000/game', {
      transports: ['websocket'],
      autoConnect: false,
      auth: {
        token: 'test-token'
      }
    });
  });

  afterAll(async () => {
    clientSocket.close();
    await new Promise((resolve) => httpServer.close(resolve));  // Ensure server closes properly
    await app.close();
  });

  it('should connect successfully', (done) => {
    clientSocket.connect();

    clientSocket.on('connect', () => {
      expect(clientSocket.connected).toBeTruthy();
      done();
    });
  });

  it('should handle connection error', (done) => {
    // Create a new client with an invalid token
    const invalidClientSocket = io('http://localhost:3000/game', {
      transports: ['websocket'],
      autoConnect: false,
      auth: {
        token: 'invalid-token'
      }
    });

    invalidClientSocket.on('connect_error', (err) => {
      expect(err.message).toBe('Authentication failed');
      done();
    });

    invalidClientSocket.connect();
  });

  it('should handle disconnection', (done) => {
    clientSocket.connect();

    clientSocket.on('connect', () => {
      clientSocket.disconnect();
    });

    clientSocket.on('disconnect', (reason) => {
      expect(reason).toBe('io client disconnect');
      done();
    });
  });

  it('should maintain connection with ping/pong', (done) => {
    clientSocket.connect();

    let pingCount = 0;
    const checkInterval = setInterval(() => {
      if (clientSocket.connected) {
        pingCount++;
        if (pingCount >= 2) {
          clearInterval(checkInterval);
          done();  // Ensure test completes
        }
      }
    }, 5000);
  });
});
