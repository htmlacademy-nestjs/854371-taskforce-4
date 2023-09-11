import { MailInterface, SubscriberInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailRepository } from './mail.repository';

const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Вы подписались на рассылку';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepository: MailRepository
  ) {}

  public async sendNotifyNewSubscriber(subscribers: SubscriberInterface[], email: string) {
      await this.mailerService.sendMail({
        to: email,
        subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
        template: './add-subscriber',
        context: {
          titles: subscribers.map((item) => item.title),
        }
    })
  }

  public async createMail(entity: MailInterface) {
    return this.mailRepository.create(entity);
  }
}
