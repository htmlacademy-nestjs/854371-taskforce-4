import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'The id of the tag',
    type: String,
    example: '1',
  })
  @Expose()
  public tagId: string;

  @ApiProperty({
    description: 'The title of the tag',
    type: String,
    example: 'urgent',
  })
  @Expose()
  public title: string;
}
