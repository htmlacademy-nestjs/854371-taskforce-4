import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailEntity } from './mail.entity';
import { MailInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailRepository {
  constructor(
    @InjectModel(MailEntity.name) private readonly mailModel: Model<MailEntity>
  ) {
  }

  public async create(entity: MailInterface) {
    const newMail = new this.mailModel(entity);
    return newMail.save();
  }
}
