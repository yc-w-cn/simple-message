import { Injectable } from '@nestjs/common';
import { PrismaService } from '@yc-w-cn/simple-message-prisma-module';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async listRecentMessages(take = 5) {
    return this.prisma.message.findMany({
      orderBy: {
        gmtCreatedAt: 'desc',
      },
      take,
    });
  }

  async saveMessage(clientId: string, eventName: string, payload: any = {}) {
    return this.prisma.message.create({
      data: {
        clientId,
        eventName,
        payload,
        gmtCreatedAt: new Date(),
      },
    });
  }
}
