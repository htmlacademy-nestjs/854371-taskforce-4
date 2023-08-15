import { Module } from '@nestjs/common';
import { TasksUserModule } from './tasks-user/tasks-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '../../../../libs/config/config-users/src/lib/get-mongoose-options';

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
