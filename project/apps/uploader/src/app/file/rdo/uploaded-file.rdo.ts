import { Expose, Transform } from 'class-transformer';

export class UploadedFileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  originalName: string;

  @Expose()
  public mimetype: string;

  @Expose()
  size: number;

  @Expose()
  hashName: string;

  @Expose()
  path: string;
}
