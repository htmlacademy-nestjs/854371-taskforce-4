import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The text of the review',
    type: String,
    minLength: 50,
    maxLength: 500,
    example: 'This is a review',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(500)
  public textReview: string;

  @ApiProperty({
    description: 'The assessment of the review',
    type: Number,
    minimum: 1,
    maximum: 5,
    example: 5,
    required: true,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  public assessment: number;
}
