import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './config/notify.config';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [ notifyConfig ]
  }) ],
  providers: [],
  exports: []
})
export class ConfigNotifyModule {
}
