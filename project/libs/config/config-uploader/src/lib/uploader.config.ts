import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DefaultAppsPorts, DefaultAnotherPorts } from '@project/shared/app-types';

export interface UploaderConfig {
  serveRoot: string;
  environment: string;
  uploadDirectory: string;
  port: number;
  db: {
    authBase: string;
    host: string;
    dbName: string;
    password: string;
    port: number;
    username: string;
  };
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env['SERVE_ROOT'] ?? '',
    environment: process.env['NODE_ENV'] ?? '',
    uploadDirectory: process.env['UPLOAD_DIRECTORY_PATH'] ?? '',
    port: parseInt(process.env['PORT'] || DefaultAppsPorts.UPLOADER.toString(), 10),
    db: {
      authBase: process.env['MONGO_AUTH_BASE'] ?? '',
      host: process.env['MONGO_HOST'] ?? '',
      dbName: process.env['MONGO_DB'] ?? '',
      password: process.env['MONGO_PASSWORD'] ?? '',
      port: parseInt(process.env['MONGO_PORT'] || DefaultAnotherPorts.MONGO.toString(), 10),
      username: process.env['MONGO_USER'] ?? ''
    }
  };

  const validationSchema = Joi.object<UploaderConfig>({
    serveRoot: Joi.string().required(),
    environment: Joi.string().valid('development', 'production', 'stage'),
    uploadDirectory: Joi.string(),
    port: Joi.number().port(),
    db: Joi.object({
      authBase: Joi.string().required(),
      host: Joi.string().valid().hostname(),
      dbName: Joi.string().required(),
      password: Joi.string().required(),
      port: Joi.number().port(),
      username: Joi.string().required()
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: false });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
