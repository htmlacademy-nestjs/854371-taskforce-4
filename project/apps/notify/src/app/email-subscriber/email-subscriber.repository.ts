import { CRUDRepository } from '@project/util/util-types';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SubscriberInterface } from '@project/shared/app-types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, SubscriberInterface> {
  constructor(
    @InjectModel(EmailSubscriberEntity.name) private readonly emailSubscriberModel: Model<EmailSubscriberEntity>
  ) {
  }

  public async create(entity: SubscriberInterface): Promise<SubscriberInterface> {
    const newEmailSubscriber = new this.emailSubscriberModel(entity);
    return newEmailSubscriber.save();
  }

  public async update(id: string, entity: SubscriberInterface): Promise<SubscriberInterface> {
    return this.emailSubscriberModel.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  public async remove(id: string): Promise<null> {
    return this.emailSubscriberModel.findByIdAndDelete(id);
  }

  public async findAll(date: Date): Promise<SubscriberInterface[]> {
    return this.emailSubscriberModel.find(
      {
        date: {
          $gt: date
        }
      }).exec();
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel.findById(id).exec();
  }

  public async findByTitle(title: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel.findOne({ title }).exec();
  }
}
