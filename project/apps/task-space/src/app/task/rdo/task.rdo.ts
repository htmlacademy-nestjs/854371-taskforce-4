import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose()
  public taskId: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public taskImage: string;

  @Expose()
  public status: string;

  @Expose()
  public category: CategoryInterface[];

  @Expose()
  public tags: TagInterface[];

  @Expose()
  public city: City;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public publishAt: Date;
}
