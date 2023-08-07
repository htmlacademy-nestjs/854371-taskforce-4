import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public city: string;

  @Expose()
  public password: string;

  @Expose()
  public role: string;

  @Expose()
  public avatar: string;

  @Expose()
  public birthDay: string;
}
