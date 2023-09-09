import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskDescription, TaskSpaceMessages, TaskTitle } from '@project/shared/app-validation';

export class UpdateTaskDto {
  @IsNotEmpty({ message: TaskSpaceMessages.TASK_TITLE_EMPTY_NOT_VALID })
  @MinLength(TaskTitle.MIN_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskTitle.MAX_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MAX_LENGTH_NOT_VALID })
  public title?: string;

  @IsString()
  @MinLength(TaskDescription.MIN_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskDescription.MAX_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MAX_LENGTH_NOT_VALID })
  public description?: string;

  @IsString()
  public taskImage?: string;

  @IsNotEmpty()
  public category?: CategoryInterface;


  @IsArray()
  public tags?: TagInterface[];

  @IsEnum(City)
  public city?: City;

  @IsString()
  public userId?: string;

  @IsISO8601()
  public dueDate?: string;

  @IsNumber()
  public coast?: number;
}
