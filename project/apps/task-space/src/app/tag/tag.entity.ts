import { Entity } from '@project/util/util-types';
import { TagInterface } from '@project/shared/app-types';

export class TagEntity implements Entity<TagEntity, TagInterface>, TagInterface {
  public title: string;

  constructor(tag: TagInterface) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: TagInterface) {
    this.title = entity.title;
  }

  public toObject(): TagEntity {
    return { ...this };
  }
}
