import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaService } from '@yc-w-cn/simple-message-prisma-module';

@Module({
  providers: [MessageService, PrismaService],
})
export class MessageModule {}
