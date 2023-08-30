import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import UploaderConfig from './uploader.config';

const ENV_FILE_PATH = 'apps/uploader/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [UploaderConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigConfigUploaderModule {}
