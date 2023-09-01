import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskInterface } from '@project/shared/app-types';
import { TaskEntity } from './task.entity';
import { CategoryRepository } from '../category/category.repository';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository
  ) {
  }

  async createTask(task: CreateTaskDto): Promise<TaskInterface> {
    const categories = await this.categoryRepository.find();
    const taskData = new TaskEntity({
      ...task,
      comments: [],
      category: [ ...categories ]
    });
    return this.taskRepository.create(taskData);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.remove(id);
  }

  async getTask(id: number): Promise<TaskInterface> {
    return this.taskRepository.findById(id);
  }

  async getTasks(): Promise<TaskInterface[]> {
    return this.taskRepository.find();
  }

  async updateTask(_id: number, _task: UpdateTaskDto): Promise<void> {
    throw new Error('Not implemented');
  }
}
