import { Entity } from '@project/util/util-types';
import { SubscriberInterface, TaskInterface } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity, SubscriberInterface>, SubscriberInterface {
  public id: string;
  public email: string;
  public name: string;
  public tasks: TaskInterface[];

  constructor(entity: SubscriberInterface) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: SubscriberInterface) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.tasks = [...entity.tasks];
  }

  public toObject(): EmailSubscriberEntity {
    return {
      ...this,
      tasks: [...this.tasks]
    }

  }
}
