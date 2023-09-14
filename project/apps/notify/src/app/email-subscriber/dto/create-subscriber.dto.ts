import { IsArray } from 'class-validator';

export class CreateSubscriberDto {
  @IsArray()
  public title: string;

  public date: Date;

  public email: string;
}
