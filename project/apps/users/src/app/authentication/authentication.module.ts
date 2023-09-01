import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TasksUserModule } from '../tasks-user/tasks-user.module';

@Module({
  controllers: [ AuthenticationController ],
  providers: [ AuthenticationService ],
  imports: [ TasksUserModule ]
})
export class AuthenticationModule {
}
