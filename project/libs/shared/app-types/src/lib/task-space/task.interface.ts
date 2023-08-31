import { TagInterface } from './tag.interface';
import { CategoryInterface } from './category.interface';
import { CommentInterface } from './comment.interface';
import { City } from '@prisma/client';

export interface TaskInterface {
  taskId?: number;
  title: string;
  description: string;
  taskImage: string;
  createdAt?: Date;
  publishAt?: Date;
  status: string;
  category: CategoryInterface[];
  tags: TagInterface[];
  city: City;
  userId?: string;
  comments: CommentInterface[];
}
