import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { DefaultAnotherPorts, DefaultAppsPorts } from '@project/shared/app-types';
import * as Joi from 'joi';

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

export default registerAs('notify', (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env['NODE_ENV'] ?? 'development',
    port: parseInt(process.env['PORT'] ?? DefaultAppsPorts.NOTIFIER.toString(), 10),
    db: {
      host: process.env['DB_HOST'] ?? DefaultAnotherPorts.MONGO.toString(),
      port: parseInt(process.env['DB_PORT'] ?? DefaultAnotherPorts.MONGO.toString(), 10),
      user: process.env['DB_USER'] ?? '',
      name: process.env['DB_NAME'] ?? '',
      password: process.env['DB_PASSWORD'] ?? '',
      authBase: process.env['DB_AUTH_BASE'] ?? '',
    },
    rabbit: {
      host: process.env['RABBIT_HOST'] ?? DefaultAnotherPorts.RABBIT.toString(),
      password: process.env['RABBIT_PASSWORD'] ?? '',
      user: process.env['RABBIT_USER'] ?? '',
      queue: process.env['RABBIT_QUEUE'] ?? '',
      exchange: process.env['RABBIT_EXCHANGE'] ?? '',
      port: parseInt(process.env['RABBIT_PORT'] ?? DefaultAnotherPorts.RABBIT.toString(), 10),
    },
    mail: {
      host: process.env['MAIL_HOST'] ?? '',
      port: parseInt(process.env['MAIL_PORT'] ?? DefaultAnotherPorts.FAKE_SMTP.toString(), 10),
      user: process.env['MAIL_USER'] ?? '',
      password: process.env['MAIL_PASSWORD'] ?? '',
      from: process.env['MAIL_FROM'] ?? '',
    }
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port()
      .default(DefaultAppsPorts.NOTIFIER),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().default(DefaultAnotherPorts.RABBIT),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    }),
    mail: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().default(DefaultAnotherPorts.FAKE_SMTP),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config);
  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`
    );
  }

  return config;
});
