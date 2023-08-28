import { TaskInterface } from './task.interface';

export interface TagInterface {
  tagId?: number;
  title: string;
  task: TaskInterface[];
}
