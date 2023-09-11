import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRdo {
  @Expose()
  @ApiProperty({
    description: 'Task id',
    example: '1',
  })
  public taskId: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Task title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task image',
    example: 'Task image',
  })
  @Expose()
  public taskImage: string;

  @ApiProperty({
    description: 'Task status',
    example: 'New',
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Task categories',
    example: [
      {
        categoryId: '1',
        name: 'Category name',
      }
    ],
  })
  @Expose()
  public category: CategoryInterface[];

  @ApiProperty({
    description: 'Task tags',
    example: [
      {
        tagId: '1',
        name: 'Tag name',
      }
    ]
  })
  @Expose()
  public tags: TagInterface[];

  @ApiProperty({
    description: 'Task city',
    example: City.Moscow
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Task user id',
    example: 'dfdf8d8f8d8f8d8f8d8f8d8f8d8f8d8f',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Task date create',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Task date update',
  })
  @Expose()
  public publishAt: Date;
}
