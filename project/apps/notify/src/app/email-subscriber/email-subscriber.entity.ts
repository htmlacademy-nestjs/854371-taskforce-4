import { Entity } from '@project/util/util-types';
import { SubscriberInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity, SubscriberInterface>, SubscriberInterface {
  public userId: string;
  public title: string;
  public description: string;
  public city: City;
  public coast: number;


  constructor(entity: SubscriberInterface) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: SubscriberInterface) {
    this.userId = entity.userId;
    this.title = entity.title;
    this.description = entity.description;
    this.city = entity.city;
    this.coast = entity.coast;
  }

  public toObject(): EmailSubscriberEntity {
    return {
      ...this
    }

  }
}
