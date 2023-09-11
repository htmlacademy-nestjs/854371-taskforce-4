import { Prop, Schema } from '@nestjs/mongoose';
import { MailInterface, SubscriberInterface } from '@project/shared/app-types';

@Schema({
  collection: 'mails',
  timestamps: true
})
export class MailModel extends Document implements MailInterface {
  @Prop()
  public email: string;

  @Prop()
  public date: Date;
}
