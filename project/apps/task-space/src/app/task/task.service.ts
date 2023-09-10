import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskInterface } from '@project/shared/app-types';
import { TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { Status } from '@prisma/client';
import { SpecialSortType } from './task.constant';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {
  }

  async createTask(task: CreateTaskDto): Promise<TaskInterface> {
    const taskData = new TaskEntity({
      ...task,
      status: Status.New
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
    const { specialSortType, category, tag, city } = query;
    let sortedTasks = await this.taskRepository.find(query);

    sortedTasks = sortedTasks.map((task) => {
      const commentsAll = task.comments.length;
      const respondExecutorsAll = task.respondingExecutors.length;
      return { ...task, commentsAll, respondExecutorsAll };
    });

    let result: TaskInterface[] = [...sortedTasks];

    if (specialSortType) {
      if (specialSortType === SpecialSortType.COMMENTS_DESC) {
        result.sort((a, b) => b.commentsAll - a.commentsAll);
      }
      if (specialSortType === SpecialSortType.POPULARITY_DESC) {
        result.sort((a, b) => b.respondExecutorsAll - a.respondExecutorsAll);
      }
    }

    if (category) {
      result = result.filter((task) => task.category.title === category);
    }

    if (tag) {
      result = result.filter((task) => task.tags.some((t) => t.title === tag));
    }

    if (city) {
      result = result.filter((task) => task.city === city);
    }

    return result;
  }


  async updateTask(id: number, task: UpdateTaskDto) {
    const existingTask = await this.taskRepository.findById(id);
    const updatedTask = new TaskEntity({ ...existingTask, ...task });
    return this.taskRepository.update(id, updatedTask);
  }

  async updateTaskStatus(id: number, status: Status) {
    return this.taskRepository.changeStatus(id, status);
  }

  async setExecutor(taskId: number, executorId: string) {
    return this.taskRepository.setExecutor(taskId, executorId);
  }

  async addRespondExecutor(userId: string, taskId: number) {
    return this.taskRepository.addRespondExecutor(userId, taskId);
  }

  async getActiveTaskByExecutorId(userId: string): Promise<TaskInterface[]> {
    return this.taskRepository.findActiveTaskByExecutorId(userId);
  }

  async getAllTaskByExecutorId(userId: string): Promise<TaskInterface[]> {
    return this.taskRepository.findAllTasksWithExecutorId(userId);
  }

  async getTasksByCreatorId(userId: string): Promise<TaskInterface[]> {
    return this.taskRepository.findByCreatorId(userId);
  }
}
