import { Module } from '@nestjs/common';
import { TasksUserModule } from './tasks-user/tasks-user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [TasksUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
