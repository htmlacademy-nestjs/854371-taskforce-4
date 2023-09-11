import { Entity } from '@project/util/util-types';
import { SubscriberInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity, SubscriberInterface>, SubscriberInterface {
  public title: string;

  constructor(entity: SubscriberInterface) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: SubscriberInterface) {
    this.title = entity.title;
  }

  public toObject(): EmailSubscriberEntity {
    return {
      ...this
    }

  }
}
