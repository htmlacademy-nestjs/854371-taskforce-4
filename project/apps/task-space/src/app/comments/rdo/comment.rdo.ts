import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The id of the comment',
    example: '1',
  })
  @Expose()
  public commentId: number;

  @ApiProperty({
    description: 'The message of the comment',
    example: 'John Doe is a good guy',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'The mongo id of the user',
    example: '5f9a3d9a9d9a9d9a9d9a9d9a',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The id of the task',
    example: '1',
  })
  @Expose()
  public taskId: number;
}
