import { ApiProperty } from '@nestjs/swagger';

export default class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'john-doe@gmail.com',
    required: true
  })
  email: string;

  @ApiProperty({
    description: 'User\'s password',
    example: 'John12345',
    minLength: 6,
    required: true
  })
  password: string;
}
