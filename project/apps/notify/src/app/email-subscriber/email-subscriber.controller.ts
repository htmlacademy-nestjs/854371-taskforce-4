import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Body, Controller, Get } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRoutingEnum } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller('notify')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'typoteka.notify',
    routingKey: RabbitRoutingEnum.AddSubscriber,
    queue: 'typoteka.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
  }

  @Get('/')
  public async show(@Body() subscriber: CreateSubscriberDto) {
    const subscribers = await this.subscriberService.getSubscribers(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscribers, subscriber.email)
    await this.mailService.createMail({email: subscriber.email})
  }
}
