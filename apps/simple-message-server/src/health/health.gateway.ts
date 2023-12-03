import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EasyLogger } from '@yc-w-cn/nest-easy-logger';
import { Interval } from '@nestjs/schedule';
import { MessageService } from '@/message/message.service';
import { SimpleMessageHealthEvent } from '@yc-w-cn/simple-message-common';

@WebSocketGateway({
  cors: { origin: '*' },
})
@Injectable()
export class HealthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new EasyLogger(HealthGateway.name);
  private clients: Set<string> = new Set();

  @WebSocketServer() io: Server;

  constructor(private readonly messageService: MessageService) {}

  @Interval(10000) // 每10秒钟触发一次
  handleCron() {
    // 向所有连接的客户端发送心跳消息
    this.clients.forEach((clientId) => {
      this.logger.debug(`Send heartbeat to client ${clientId}`);
      const message = 'Are you alive?';
      this.messageService.saveMessage(
        clientId,
        SimpleMessageHealthEvent.Heartbeat,
        message,
      );
      this.io.to(clientId).emit(SimpleMessageHealthEvent.Heartbeat, message);
    });
  }

  afterInit() {
    this.logger.log('Server initialized');
  }

  handleConnection(client: Socket) {
    this.clients.add(client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
