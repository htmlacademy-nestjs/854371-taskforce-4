import { City } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty()
  @IsString()
  public userId: string

  @IsNotEmpty()
  @IsString()
  public title: string

  @IsNotEmpty()
  @IsString()
  public description: string

  @IsNotEmpty()
  @IsEnum(City)
  public city: City

  @IsNotEmpty()
  @IsNumber()
  public coast: number
}
