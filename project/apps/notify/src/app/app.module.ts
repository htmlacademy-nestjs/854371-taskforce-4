import { Module } from '@nestjs/common';
import { ConfigNotifyModule } from '@project/config/notify-config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('notify.db')),
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
