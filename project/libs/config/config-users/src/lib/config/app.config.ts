import { registerAs } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

export interface ApplicationConfig {
  environment: string
  port: number
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env['NODE_ENV'] ?? '',
    port: parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10),
  }

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().required().valid('development', 'production', 'stage'),
    port: Joi.number().port().default(DEFAULT_PORT)
  })

  const {error} = validationSchema.validate(config, {abortEarly: false})

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`,
    );
  }

  return config
})
