import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT, MAX_TASK_COUNT_LIMIT } from '../task.constant';

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
}
