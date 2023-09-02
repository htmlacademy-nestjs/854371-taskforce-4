import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City, Status } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public title: string;
  public description: string;
  public taskImage: string;
  public status: Status;
  public category: CategoryInterface;
  public tags: TagInterface[];
  public city: City;
  public userId: string;
}
