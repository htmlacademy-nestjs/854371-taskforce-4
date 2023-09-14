import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DefaultAnotherPorts } from '@project/shared/app-types';

export interface RabbitConfig {
  host: string;
  password: string;
  user: string;
  queue: string;
  exchange: string;
  port: number;
}

export default registerAs('rabbit', (): RabbitConfig => {
  const config: RabbitConfig = {
    host: process.env['RABBIT_HOST'] ?? '',
    password: process.env['RABBIT_PASSWORD'] ?? '',
    port: parseInt(process.env['RABBIT_PORT'] ?? DefaultAnotherPorts.RABBIT.toString(), 10),
    user: process.env['RABBIT_USER'] ?? '',
    queue: process.env['RABBIT_QUEUE'] ?? '',
    exchange: process.env['RABBIT_EXCHANGE'] ?? '',
  };

  const validationSchema = Joi.object<RabbitConfig>({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DefaultAnotherPorts.RABBIT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
