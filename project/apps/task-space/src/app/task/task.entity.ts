import { Entity } from '@project/util/util-types';
import { CategoryInterface, Cities, CommentInterface, TagInterface, TaskInterface } from '@project/shared/app-types';

export class TaskEntity implements Entity<TaskEntity, TaskInterface>, TaskInterface {
  public title: string;
  public description: string;
  public taskImage: string;
  public createdAt: Date;
  public publishAt: Date;
  public status: string;
  public category: CategoryInterface[];
  public tags: TagInterface[];
  public city: Cities;
  public userId?: string;
  public comments: CommentInterface[];

  constructor(task: TaskInterface) {
    this.fillEntity(task);
  }

  public fillEntity(entity: TaskInterface) {
    this.title = entity.title;
    this.description = entity.description;
    this.taskImage = entity.taskImage;
    this.createdAt = new Date();
    this.publishAt = new Date();
    this.status = entity.status;
    this.category = [...entity.category];
    this.tags = [...entity.tags];
    this.city = entity.city;
    this.userId = entity.userId;
    this.comments = [];
  }

  public toObject(): TaskEntity {
    return ({
      ...this,
      tags: [...this.tags],
      category: [...this.category],
      comments: [...this.comments]
    });
  }
}
