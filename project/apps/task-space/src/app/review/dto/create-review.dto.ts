import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  public textReview: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  public assessment: number;
}
