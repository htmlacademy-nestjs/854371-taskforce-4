import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query, Req,
  UseGuards
} from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { ExceptionMessages, JwtAuthGuard } from '@project/shared/authentication';
import { RequestWithPayload, UserRole } from '@project/shared/app-types';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/new')
  async index(@Query() query: TaskQuery, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Executor) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const tasks = this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateTaskDto, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Customer) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const createdTask = this.taskService.createTask(Object.assign(dto, { userId: sub }));
    return fillObject(TaskRdo, createdTask);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Customer) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskService.getTask(id);

    if (sub !== existTask.userId) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_UPDATE, HttpStatus.FORBIDDEN);
    }

    await this.taskService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto,  @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Customer) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskService.getTask(id);

    if (sub !== existTask.userId) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_UPDATE, HttpStatus.FORBIDDEN);
    }

    const updatedTask = await this.taskService.updateTask(id, Object.assign(dto, { userId: sub }));
    return fillObject(TaskRdo, updatedTask);
  }
}
