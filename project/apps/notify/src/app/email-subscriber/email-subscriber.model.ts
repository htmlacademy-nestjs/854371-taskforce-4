import { SubscriberInterface } from '@project/shared/app-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'email-subscribers',
  timestamps: true
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public title: string;

  @Prop()
  public role: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
