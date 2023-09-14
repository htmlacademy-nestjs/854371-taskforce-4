import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenInterface } from '@project/shared/app-types';
import { Document } from 'mongoose';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true
})
export class RefreshTokenModel extends Document implements TokenInterface {
  @Prop()
  public createdAt: Date;

  @Prop({ required: true })
  public tokenId: string;

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);
