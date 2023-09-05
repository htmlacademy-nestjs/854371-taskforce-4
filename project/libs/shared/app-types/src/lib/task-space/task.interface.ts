import { TagInterface } from './tag.interface';
import { CategoryInterface } from './category.interface';
import { CommentInterface } from './comment.interface';
import { City, Status } from '@prisma/client';

export interface TaskInterface {
  taskId?: number;
  title: string;
  description: string;
  taskImage: string;
  createdAt?: Date;
  publishAt?: Date;
  status: Status;
  category: CategoryInterface;
  tags: TagInterface[];
  city: City;
  userId?: string;
  comments: CommentInterface[];
  address?: string;
  coast?: number;
}
