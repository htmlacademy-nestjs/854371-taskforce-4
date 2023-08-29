import { Entity } from '@project/util/util-types';
import { CategoryInterface } from '@project/shared/app-types';

export class TaskSpaceCategoryEntity implements Entity<TaskSpaceCategoryEntity, CategoryInterface>, CategoryInterface {
  public categoryId: number;
  public title: string;

  constructor(category: CategoryInterface) {
    this.fillEntity(category);
  }

  public fillEntity(entity: CategoryInterface) {
    this.categoryId = entity.categoryId;
    this.title = entity.title;
  }

  public toObject(): TaskSpaceCategoryEntity {
    return {...this};
  }
}
