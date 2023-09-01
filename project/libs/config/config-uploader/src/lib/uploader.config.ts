import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;

export interface UploaderConfig {
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
    environment: process.env['NODE_ENV'] ?? '',
    uploadDirectory: process.env['UPLOAD_DIRECTORY_PATH'] ?? '',
    port: parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10),
    db: {
      authBase: process.env['MONGO_AUTH_BASE'] ?? '',
      host: process.env['MONGO_HOST'] ?? '',
      dbName: process.env['MONGO_NAME'] ?? '',
      password: process.env['MONGO_PASSWORD'] ?? '',
      port: parseInt(process.env['MONGO_PORT'] || DEFAULT_MONGO_PORT.toString(), 10),
      username: process.env['MONGO_USERNAME'] ?? ''
    }
  };

  const validationSchema = Joi.object<UploaderConfig>({
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
