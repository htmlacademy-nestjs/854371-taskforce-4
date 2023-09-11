import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskDescription, TaskSpaceMessages, TaskTitle } from '@project/shared/app-validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    type: String,
    minLength: TaskTitle.MIN_LENGTH,
    maxLength: TaskTitle.MAX_LENGTH,
    example: 'Create a telegram bot',
  })
  @MinLength(TaskTitle.MIN_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskTitle.MAX_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MAX_LENGTH_NOT_VALID })
  public title?: string;

  @ApiProperty({
    description: 'The description of the task',
    type: String,
    minLength: TaskDescription.MIN_LENGTH,
    maxLength: TaskDescription.MAX_LENGTH,
    example: 'Create a telegram bot and deploy it to heroku',
  })
  @IsString()
  @MinLength(TaskDescription.MIN_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskDescription.MAX_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MAX_LENGTH_NOT_VALID })
  public description?: string;

  @ApiProperty({
    description: 'The image of the task',
    type: String,
    example: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  })
  @IsString()
  public taskImage?: string;

  @ApiProperty({
    description: 'The category of the task',
    type: Object,
    example: {
      categoryId: 1,
      title: 'IT',
    },
  })
  @IsNotEmpty()
  public category?: CategoryInterface;

  @ApiProperty({
    description: 'The tags of the task',
    type: Array,
    example: [
      {
        tagId: 1,
        title: 'urgent',
      },
      {
        tagId: 2,
        title: 'important',
      }
    ]
  })
  @IsArray()
  public tags?: TagInterface[];

  @ApiProperty({
    description: 'The city of the task',
    enum: City,
    example: City.Moscow,
  })
  @IsEnum(City)
  public city?: City;

  @ApiProperty({
    description: 'The due date of the task',
    type: String,
    example: '2021-08-01T00:00:00.000Z',
  })
  @IsISO8601()
  public dueDate?: string;

  @ApiProperty({
    description: 'The coast of the task',
    type: Number,
    example: 1000,
  })
  @IsNumber()
  public coast?: number;
}
