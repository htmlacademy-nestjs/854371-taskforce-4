import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  DEFAULT_SORT_DIRECTION,
  DEFAULT_TASK_COUNT_LIMIT,
  MAX_TASK_COUNT_LIMIT,
  SpecialSortType
} from '../task.constant';
import { City } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskQuery {
  @ApiProperty({
    description: 'Task count limit',
    example: '10',
  })
  @Transform(({ value }) => {
    if (+value) {
      return +value > MAX_TASK_COUNT_LIMIT ? MAX_TASK_COUNT_LIMIT : +value;
    }

    return DEFAULT_TASK_COUNT_LIMIT;
  })
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @ApiProperty({
    description: 'Task sort direction',
    enum: [ 'asc', 'desc' ],
    example: 'desc',
  })
  @IsIn([ 'asc', 'desc' ])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Task page',
    example: 1,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @ApiProperty({
    description: 'Task special sort type',
    enum: SpecialSortType,
    example: SpecialSortType.COMMENTS_DESC,
  })
  @IsEnum(SpecialSortType)
  @IsOptional()
  public specialSortType?: SpecialSortType;


  @ApiProperty({
    description: 'Task category',
    example: 'Category name',
  })
  @IsString()
  @IsOptional()
  public category?: string;

  @ApiProperty({
    description: 'Task tag',
    example: 'Tag name',
  })
  @IsString()
  @IsOptional()
  public tag?: string;

  @ApiProperty({
    description: 'Task city',
    enum: City,
  })
  @IsEnum(City)
  @IsOptional()
  public city?: City;
}

