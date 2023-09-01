import { FileInterface } from '@project/shared/app-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'files'
})
export class FileModel extends Document implements FileInterface {
  @Prop({
    required: true
  })
  originalName: string;

  @Prop({
    required: true
  })
  size: number;

  @Prop({
    required: true
  })
  hashName: string;

  @Prop({
    required: true
  })
  path: string;

  @Prop({
    required: true
  })
  public mimetype: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
