import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    const existTask = await this.taskService.getTask(taskId);
    return fillObject(TaskRdo, existTask);
  }

  @Get('/')
  async index() {
    const tasks = this.taskService.getTasks();
    return fillObject(TaskRdo, tasks);
  }

  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const createdTask = this.taskService.createTask(dto);
    return fillObject(TaskRdo, createdTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    await this.taskService.deleteTask(taskId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const taskId = parseInt(id, 10);
    const updatedTask = await this.taskService.updateTask(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }
}
