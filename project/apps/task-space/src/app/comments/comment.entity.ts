import { Entity } from '@project/util/util-types';
import { CommentInterface } from '@project/shared/app-types';

export class CommentEntity implements Entity<CommentEntity, CommentInterface>, CommentInterface {
  public message: string;
  public userId: string;
  public taskId: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment)
  }

  public fillEntity(entity: CommentInterface) {
    this.message = entity.message;
    this.userId = entity.userId;
    this.taskId = entity.taskId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public toObject(): CommentEntity {
    return { ...this };
  }
}
