import { UserRole } from './user-role.enum';
import { Cities } from './cities.type';
import { City } from '@prisma/client';

export interface UserInterface {
  aboutMe: string;
  ageInYears: number;
  avatar: string;
  birthDay: Date;
  city: City;
  completedTasksCount: number;
  email: string;
  failedTasksCount: number;
  id?: string;
  name: string;
  passwordHash: string;
  rating: number;
  ratingPosition: number;
  regDate: string;
  role: UserRole;
  specialization: string;
}
