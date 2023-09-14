import { Entity } from '@project/util/util-types';
import { MailInterface } from '@project/shared/app-types';

export class MailEntity implements Entity<MailEntity, MailInterface>, MailInterface {
  public email: string;

  constructor(entity: MailEntity) {
    this.fillEntity(entity);
  }

  fillEntity(entity: MailInterface) {
    this.email = entity.email;
  }

  toObject() {
    return {
      ...this
    };
  }
}
