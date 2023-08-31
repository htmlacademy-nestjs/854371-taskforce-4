import { Module } from '@nestjs/common';
import { TasksUserModule } from './tasks-user/tasks-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production'
    }),
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
