import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const createdTask = this.taskService.createTask(dto);
    return fillObject(TaskRdo, createdTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }
}
