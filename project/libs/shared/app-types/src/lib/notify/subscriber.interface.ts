import { City } from '@prisma/client';

export interface SubscriberInterface {
  userId: string;
  title: string;
  description: string;
  city: City;
  coast: number;
}
