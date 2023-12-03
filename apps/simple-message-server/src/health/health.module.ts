import { Module } from '@nestjs/common';
import { HealthGateway } from './health.gateway';
import { MessageService } from '@/message/message.service';
import { PrismaService } from '@yc-w-cn/simple-message-prisma-module';

@Module({
  providers: [HealthGateway, MessageService, PrismaService],
})
export class HealthModule {}
