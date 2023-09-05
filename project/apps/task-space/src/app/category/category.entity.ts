import { Entity } from '@project/util/util-types';
import { CategoryInterface } from '@project/shared/app-types';

export class CategoryEntity implements Entity<CategoryEntity, CategoryInterface>, CategoryInterface {
  public categoryId: number;
  public title: string;

  constructor(category: CategoryInterface) {
    this.fillEntity(category);
  }

  public fillEntity(entity: CategoryInterface) {
    this.categoryId = entity.categoryId;
    this.title = entity.title;
  }

  public toObject(): CategoryEntity {
    return { ...this };
  }
}
