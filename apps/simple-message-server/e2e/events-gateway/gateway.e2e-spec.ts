import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { io, Socket } from 'socket.io-client';

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;

  beforeAll(async () => {
    // 模拟环境变量
    process.env.WEB_SOCKET_ADAPTER = 'DIRECT';
    process.env.PORT = '3000';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(3000);
  });

  beforeEach((done) => {
    socket = io('http://localhost:3000');
    socket.on('connect', () => {
      done();
    });
  });

  describe('identity', () => {
    it('should return the same number has what was sent', (done) => {
      socket.emit('identity', 0, (response) => {
        expect(response).toBe(0);
        done();
      });
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  afterAll(async () => {
    // 清理环境变量
    delete process.env.WEB_SOCKET_ADAPTER;
    delete process.env.PORT;

    await app.close();
  });
});
