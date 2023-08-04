import { Cities, UserRole } from '@project/shared/app-types';

export default class CreateUserDto {
  public name: string;
  public email: string;
  public city: Cities;
  public password: string;
  public role: UserRole;
  public avatar: string;
  public birthDay: string;
}
