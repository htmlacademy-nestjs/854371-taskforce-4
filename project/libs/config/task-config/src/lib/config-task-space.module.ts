import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import simpleJwtConfig from './config/simple-jwt.config';

const ENV_USERS_FILE_PATH = 'apps/task-space/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_USERS_FILE_PATH,
      load: [ simpleJwtConfig ]
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigTaskSpaceModule {}
