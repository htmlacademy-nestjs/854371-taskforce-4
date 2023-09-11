import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'The id of the category',
    example: '1',
  })
  @Expose()
  public categoryId: string;

  @ApiProperty({
    description: 'The title of the category',
    example: 'Category 1',
  })
  @Expose()
  public title: string;
}
