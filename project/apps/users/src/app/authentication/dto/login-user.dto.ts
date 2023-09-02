import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserDtoValidateMessages, UsersPassword } from '@project/shared/app-validation';

export default class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'john-doe@gmail.com',
    required: true
  })
  @IsEmail({}, { message: UserDtoValidateMessages.AUTH_USER_EMAIL_NOT_VALID })
  email: string;

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
}
