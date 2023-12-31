import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';

const ENV_USERS_FILE_PATH = 'apps/users/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_USERS_FILE_PATH,
      load: [ appConfig, dbConfig, jwtConfig ]
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigUsersModule {
}
