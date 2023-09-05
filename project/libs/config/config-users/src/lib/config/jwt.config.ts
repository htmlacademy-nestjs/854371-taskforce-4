import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export default registerAs('jwt', (): JwtConfig => {
  const config: JwtConfig = {
    secret: process.env['JWT_SECRET'] ?? '',
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '',
  }

  const validationSchema = Joi.object<JwtConfig>({
    secret: Joi.string().required(),
    expiresIn: Joi.string().required()
  })

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[JWT Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
})
