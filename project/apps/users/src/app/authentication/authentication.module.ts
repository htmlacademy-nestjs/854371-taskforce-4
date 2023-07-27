import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TasksUserModule } from '../tasks-user/tasks-user.module';
import TaskUserMemoryRepository from '../tasks-user/task-user-memory.repository';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [TasksUserModule]
})
export class AuthenticationModule {
  constructor(
    private readonly userRepository: TaskUserMemoryRepository
  ) {}
}
