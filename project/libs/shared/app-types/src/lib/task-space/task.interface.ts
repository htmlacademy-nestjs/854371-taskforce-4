import { Cities } from '../user/cities.type';
import { TagInterface } from './tag.interface';
import { CategoryInterface } from './category.interface';

export interface TaskInterface {
  taskId?: number;
  title: string;
  description: string;
  taskImage: string;
  createdAt: Date;
  publishAt: Date;
  status: string;
  category: CategoryInterface[];
  tags: TagInterface[];
  city: Cities
  userId?: string;
  comments: string;
}
