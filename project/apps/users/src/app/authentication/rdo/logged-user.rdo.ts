import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6ef3d230-fdad-4353-b69e-781677afe22a',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The uniq user email',
    example: 'keks@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'g6yfhqkgxc8ytbq3jce2msdfxuy28heqszyjzvjjsintrwde36n5jxm57eoby7edw7ynhi53u63chqvzqyrq44dmjmrax8dqhsv6pkxh',
  })
  @Expose()
  public accessToken: string;
}
