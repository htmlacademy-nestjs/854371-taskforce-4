import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {
  }

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const existSubscriber = await this.emailSubscriberRepository.findByTitle(subscriber.title);

    if (existSubscriber) {
      return existSubscriber;
    }

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }

  public async getSubscribers(subscriber: CreateSubscriberDto) {
    return this.emailSubscriberRepository.findAll(subscriber.date);
  }
}
