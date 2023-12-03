import { Module } from '@nestjs/common';
import { MessageService } from '@/message/message.service';
import { PrismaService } from '@yc-w-cn/simple-message-prisma-module';
import { ManageGateway } from './manage.gateway';

@Module({
  providers: [ManageGateway, MessageService, PrismaService],
})
export class ManageModule {}
