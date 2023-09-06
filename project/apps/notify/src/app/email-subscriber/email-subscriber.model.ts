import { SubscriberInterface, TaskInterface } from '@project/shared/app-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'email-subscribers',
  timestamps: true
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public tasks: TaskInterface[];
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
