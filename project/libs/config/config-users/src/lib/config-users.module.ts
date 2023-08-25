import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig } from '../index';

const ENV_USERS_FILE_PATH = 'apps/users/users.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_USERS_FILE_PATH,
      load: [appConfig, dbConfig]
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigUsersModule {}
