import { Module } from '@nestjs/common';
import { TasksUserModule } from './tasks-user/tasks-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    TasksUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
