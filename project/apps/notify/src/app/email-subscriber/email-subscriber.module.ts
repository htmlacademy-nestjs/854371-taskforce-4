import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitOptions } from '@project/util/util-core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitOptions('notify.rabbit')
    ),
  ],
  controllers: [ EmailSubscriberController ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberController
  ],
})
export class EmailSubscriberModule {
}
