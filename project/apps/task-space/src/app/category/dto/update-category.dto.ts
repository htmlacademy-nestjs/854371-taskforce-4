import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The title of the category',
    example: 'Category 1',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
