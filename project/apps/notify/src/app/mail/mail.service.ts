import { SubscriberInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Вы подписались на рассылку';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      to: 'N1GQH@example.com',
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        // TODO: подготовить контекст
      }
    })
  }
}
