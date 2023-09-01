import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/util/util-core';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: (config: ConfigService) => ({
      uri: getMongoConnectionString({
        host: config.get<string>('application.db.host') ?? '',
        port: config.get<string>('application.db.port') ?? '',
        username: config.get<string>('application.db.username') ?? '',
        password: config.get<string>('application.db.password') ?? '',
        authDB: config.get<string>('application.db.authBase') ?? '',
        dbName: config.get<string>('application.db.name') ?? '',
      })
    })
  };
}
