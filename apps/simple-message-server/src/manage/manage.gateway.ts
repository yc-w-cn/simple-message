import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  SimpleMessageManageEvent,
  SimpleMessageMessageEvent,
} from '@yc-w-cn/simple-message-common';
import { EasyLogger } from '@yc-w-cn/nest-easy-logger';
import { MessageService } from '@/message/message.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
@Injectable()
export class ManageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new EasyLogger(ManageGateway.name);
  private clients: Set<string> = new Set();

  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() io: Server;

  @SubscribeMessage(SimpleMessageManageEvent.ListConnectedClientIds)
  listConnectedClientIds(client: Socket) {
    this.messageService.saveMessage(
      client.id,
      SimpleMessageManageEvent.ListConnectedClientIds,
    );
    const connectedIds = [...this.clients];
    this.logger.debug('listConnectedClientIds', connectedIds);
    return connectedIds;
  }

  @SubscribeMessage(SimpleMessageMessageEvent.ListRecentMessages)
  async listRecentMessages(client: Socket) {
    this.messageService.saveMessage(
      client.id,
      SimpleMessageMessageEvent.ListRecentMessages,
    );
    const messages = await this.messageService.listRecentMessages();
    this.logger.debug('listRecentMessages', messages);
    return messages;
  }

  handleConnection(client: Socket) {
    this.logger.debug('handleConnection', client.id);
    this.clients.add(client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug('handleDisconnect', client.id);
    this.clients.delete(client.id);
  }
}
