import { TaskInterface } from './task.interface';

export interface CommentInterface {
  commentId?: number;
  message: string;
  userId?: string;
  Task: TaskInterface;
  taskId: number;
  createdAt: Date;
  updatedAt: Date;
}
