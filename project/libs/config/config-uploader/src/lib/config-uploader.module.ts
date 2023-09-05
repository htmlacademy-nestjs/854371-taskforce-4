import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import uploaderConfig from './uploader.config';
import * as path from 'node:path';

const ENV_FILE_PATH = path.resolve('apps/uploader/.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [ uploaderConfig ],
      envFilePath: ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigUploaderModule {
}
