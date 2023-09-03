import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
