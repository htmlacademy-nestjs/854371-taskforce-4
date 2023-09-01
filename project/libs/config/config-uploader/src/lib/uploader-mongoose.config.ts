import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@project/util/util-core';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: config.get<string>('application.db.host') ?? '',
          port: config.get<string>('application.db.port') ?? '',
          username: config.get<string>('application.db.username') ?? '',
          password: config.get<string>('application.db.password') ?? '',
          authDB: config.get<string>('application.db.authBase') ?? '',
          dbName: config.get<string>('application.db.name') ?? '',
        }),
      }
    },
    inject: [ConfigService]
  }
}
