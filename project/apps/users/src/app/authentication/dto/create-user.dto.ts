import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@project/shared/app-types';
import { IsEmail, IsEnum, IsISO8601, IsString, MaxLength, MinLength } from 'class-validator';
import { UserDtoValidateMessages, UsersName, UsersPassword } from '@project/shared/app-validation';
import { City } from '@prisma/client';

export default class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true,
    minLength: UsersName.MIN_LENGTH,
    maxLength: UsersName.MAX_LENGTH
  })
  @IsString()
  @MinLength(UsersName.MIN_LENGTH, { message: UserDtoValidateMessages.MIN_LENGTH_USER_NAME_NOT_VALID })
  @MaxLength(UsersName.MAX_LENGTH, { message: UserDtoValidateMessages.MAX_LENGTH_USER_NAME_NOT_VALID })
  public name: string;

  @ApiProperty({
    description: 'User\'s description',
    example: 'I\'m John, I\'m programmer',
  })
  public aboutMe: string;

  @ApiProperty({
    description: 'User\'s specialization',
    example: 'programmer',
  })
  public specialization: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'john-doe@gmail.com',
    required: true
  })
  @IsEmail({}, { message: UserDtoValidateMessages.AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User\'s city',
    enum: [ 'Moscow', 'Saint Petersburg', 'Vladivostok' ],
    required: true
  })
  @IsEnum(City, { message: UserDtoValidateMessages.CITY_IS_NOT_VALID })
  public city: City;

  @ApiProperty({
    description: 'User\'s password',
    example: 'John12345',
    minLength: UsersPassword.MIN_LENGTH,
    maxLength: UsersPassword.MAX_LENGTH,
    required: true
  })
  @IsString()
  @MinLength(UsersPassword.MIN_LENGTH, { message: UserDtoValidateMessages.PASSWORD_MIN_LENGTH_NOT_VALID })
  @MaxLength(UsersPassword.MAX_LENGTH, { message: UserDtoValidateMessages.PASSWORD_MAX_LENGTH_NOT_VALID })
  public password: string;

  @ApiProperty({
    description: 'User\'s role',
    enum: UserRole,
    required: true
  })
  @IsEnum(UserRole, { message: UserDtoValidateMessages.ROLE_IS_NOT_VALID })
  public role: UserRole;

  @ApiProperty({
    description: 'User\'s avatar',
    example: 'http://super-site.com/avatar/john-super-avatar.jpg'
  })
  public avatar: string;

  @ApiProperty({
    description: 'User\'s birth day',
    example: '1981-03-12',
    required: true
  })
  @IsISO8601({}, { message: UserDtoValidateMessages.BIRTHDAY_IS_NOT_VALID })
  public birthDay: string;
}
