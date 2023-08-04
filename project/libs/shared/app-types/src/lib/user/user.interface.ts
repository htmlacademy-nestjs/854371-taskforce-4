import { UserRole } from './user-role.enum';
import { Cities } from './cities.type';

export interface UserInterface {
  aboutMe: string;
  ageInYears: number;
  avatar: string;
  city: Cities;
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
  birthDay: Date;
}
