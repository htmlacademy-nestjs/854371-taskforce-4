import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskInterface } from '@project/shared/app-types';
import { TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {
  }

  async createTask(task: CreateTaskDto): Promise<TaskInterface> {
    const taskData = new TaskEntity({
      ...task,
      comments: [],
    });
    return this.taskRepository.create(taskData);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.remove(id);
  }

  async getTask(id: number): Promise<TaskInterface> {
    return this.taskRepository.findById(id);
  }

  async getTasks(query: TaskQuery): Promise<TaskInterface[]> {
    return this.taskRepository.find(query);
  }

  async updateTask(_id: number, _task: UpdateTaskDto): Promise<void> {
    throw new Error('Not implemented');
  }
}
