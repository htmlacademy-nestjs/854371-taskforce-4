import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  DEFAULT_SORT_DIRECTION,
  DEFAULT_TASK_COUNT_LIMIT,
  MAX_TASK_COUNT_LIMIT,
  SpecialSortType
} from '../task.constant';
import { City } from '@prisma/client';

export class TaskQuery {
  @Transform(({ value }) => {
    if (+value) {
      return +value > MAX_TASK_COUNT_LIMIT ? MAX_TASK_COUNT_LIMIT : +value
    }

    return DEFAULT_TASK_COUNT_LIMIT
  })
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsEnum(SpecialSortType)
  @IsOptional()
  public specialSortType?: SpecialSortType;

  @IsString()
  @IsOptional()
  public category?: string;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsEnum(City)
  @IsOptional()
  public city?: City;
}

