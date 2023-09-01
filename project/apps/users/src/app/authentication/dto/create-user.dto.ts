import { ApiProperty } from '@nestjs/swagger';
import { Cities, UserRole } from '@project/shared/app-types';

export default class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true
  })
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
  public email: string;

  @ApiProperty({
    description: 'User\'s city',
    enum: [ 'Moscow', 'Saint Petersburg', 'Vladivostok' ],
    required: true
  })
  public city: Cities;

  @ApiProperty({
    description: 'User\'s password',
    example: 'John12345',
    minLength: 6,
    required: true
  })
  public password: string;

  @ApiProperty({
    description: 'User\'s role',
    enum: UserRole,
    required: true
  })
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
  public birthDay: string;
}
