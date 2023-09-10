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
import { Status } from '@prisma/client';

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
    const { role } = user;

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

  @UseGuards(JwtAuthGuard)
  @Post('/:id/respond')
  async addRespondExecutor(@Param('id') taskId: number, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Executor) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existActiveTasksWithExecutor = await this.taskService.getActiveTaskByExecutorId(sub);

    if (existActiveTasksWithExecutor) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_RESPOND, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskService.getTask(taskId);

    if (!existTask) {
      throw new HttpException(ExceptionMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.taskService.addRespondExecutor(sub, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:taskId/executor/:id/choose')
  async chooseExecutor(@Param('taskId') taskId: number, @Param('id') userId: string, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    if (role !== UserRole.Customer) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskService.getTask(taskId);

    if (!existTask) {
      throw new HttpException(ExceptionMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (existTask.userId !== sub) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_UPDATE, HttpStatus.FORBIDDEN);
    }

    if (!existTask.respondingExecutors.includes(userId)) {
      throw new HttpException(ExceptionMessages.CONFLICT_CHOOSE, HttpStatus.CONFLICT);
    }

    const existActiveTasksWithExecutor = await this.taskService.getActiveTaskByExecutorId(userId);

    if (existActiveTasksWithExecutor) {
      throw new HttpException(ExceptionMessages.CONFLICT_CHOOSE, HttpStatus.CONFLICT);
    }

    return this.taskService.setExecutor(taskId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/update-status/:status')
  async changeStatus(@Param('id') taskId: number, @Param('status') status: Status, @Req() { user }: RequestWithPayload) {
    const { sub, role } = user;

    const existTask = await this.taskService.getTask(taskId);

    if (!existTask) {
      throw new HttpException(ExceptionMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (existTask.status === Status.InProgress && status === Status.Completed && role === UserRole.Customer && existTask.userId === sub) {
      return this.taskService.updateTaskStatus(taskId, status);
    }

    if (existTask.status === Status.New && status === Status.Cancelled && role === UserRole.Customer && existTask.userId === sub) {
      return this.taskService.updateTaskStatus(taskId, status);
    }

    if (existTask.status === Status.InProgress && status === Status.Failed && role === UserRole.Executor && existTask.selectedExecutor === sub) {
      return this.taskService.updateTaskStatus(taskId, status);
    }

    throw new HttpException(ExceptionMessages.STATUS_BAD_REQUEST, HttpStatus.BAD_REQUEST)
  }
}
