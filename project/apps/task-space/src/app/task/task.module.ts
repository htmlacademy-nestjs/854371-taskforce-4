import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository]
})
export class TaskModule {}
