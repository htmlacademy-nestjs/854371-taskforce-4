import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './config/notify.config';

const envFilePath = 'apps/notify/.env';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [ notifyConfig ]
  })],
  providers: [],
  exports: []
})
export class ConfigNotifyModule {}
