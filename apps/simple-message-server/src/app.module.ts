import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { HealthModule } from './health/health.module';
import { ManageModule } from './manage/manage.module';

@Module({
  imports: [ConfigModule, MessageModule, HealthModule, ManageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
