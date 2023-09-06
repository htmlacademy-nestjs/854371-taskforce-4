import { City } from '@prisma/client';

export class CreateSubscriberDto {
  public userId: string;
  public title: string;
  public description: string;
  public city: City;
  public coast: number;
}
