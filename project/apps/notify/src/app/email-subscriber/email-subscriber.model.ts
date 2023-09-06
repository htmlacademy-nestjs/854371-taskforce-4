import { SubscriberInterface } from '@project/shared/app-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '@prisma/client';

@Schema({
  collection: 'email-subscribers',
  timestamps: true
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public userId: string

  @Prop()
  public title: string

  @Prop()
  public description: string

  @Prop()
  public city: City

  @Prop()
  public coast: number
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
