import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public commentId: number;

  @Expose()
  public message: string;

  @Expose()
  public userId: string;

  @Expose()
  public taskId: number;
}