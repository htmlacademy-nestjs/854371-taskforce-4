import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [ CategoryModule ],
  controllers: [ TaskController ],
  providers: [ TaskService, TaskRepository ],
  exports: [ TaskRepository ]
})
export class TaskModule {
}
