import { Cities, UserInterface, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export default class TaskUserEntity implements UserInterface {
  public aboutMe: string;
  public ageInYears: number;
  public avatar: string;
  public city: Cities;
  public completedTasksCount: number;
  public email: string;
  public failedTasksCount: number;
  public id?: string;
  public name: string;
  public passwordHash: string;
  public rating: number;
  public ratingPosition: number;
  public regDate: string;
  public role: UserRole;
  public specialization: string;
  public birthDay: Date;

  constructor(taskUser: UserInterface) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return ({
      aboutMe: this.aboutMe,
      ageInYears: this.ageInYears,
      avatar: this.avatar,
      city: this.city,
      completedTasksCount: this.completedTasksCount,
      email: this.email,
      failedTasksCount: this.failedTasksCount,
      id: this.id,
      name: this.name,
      passwordHash: this.passwordHash,
      rating: this.rating,
      ratingPosition: this.ratingPosition,
      regDate: this.regDate,
      role: this.role,
      specialization: this.specialization,
      birthDay: this.birthDay
    });
  }

  public fillEntity(taskUser: UserInterface) {
    this.aboutMe = taskUser.aboutMe;
    this.ageInYears = taskUser.ageInYears;
    this.avatar = taskUser.avatar;
    this.city = taskUser.city;
    this.completedTasksCount = taskUser.completedTasksCount;
    this.email = taskUser.email;
    this.failedTasksCount = taskUser.failedTasksCount;
    this.id = taskUser.id;
    this.name = taskUser.name;
    this.passwordHash = taskUser.passwordHash;
    this.rating = taskUser.rating;
    this.ratingPosition = taskUser.ratingPosition;
    this.regDate = taskUser.regDate;
    this.role = taskUser.role;
    this.specialization = taskUser.specialization;
    this.birthDay = taskUser.birthDay;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }
}
