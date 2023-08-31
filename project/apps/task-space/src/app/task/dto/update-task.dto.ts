import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City } from '@prisma/client';

export class UpdateTaskDto {
  public title?: string;
  public description?: string;
  public taskImage?: string;
  public status?: string;
  public category?: CategoryInterface[];
  public tags?: TagInterface[];
  public city?: City;
}
