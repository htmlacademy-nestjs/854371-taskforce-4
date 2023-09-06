import { TaskInterface } from '../task-space/task.interface';

export interface SubscriberInterface {
  id?: string,
  email: string,
  name: string,
  tasks: TaskInterface[]
}
