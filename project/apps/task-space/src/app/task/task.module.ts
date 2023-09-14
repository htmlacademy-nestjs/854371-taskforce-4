import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { JwtAccessStrategy } from '@project/shared/authentication';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getSimpleJwtOptions } from '@project/config/task-config';

@Module({
  imports: [
    CategoryModule,
    JwtModule.registerAsync({
      inject: [ ConfigService ],
      useFactory: getSimpleJwtOptions
    }),
  ],
  controllers: [ TaskController ],
  providers: [ TaskService, TaskRepository, JwtAccessStrategy ],
  exports: [ TaskRepository ]
})
export class TaskModule {
}
