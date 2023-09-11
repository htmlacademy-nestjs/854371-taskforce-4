import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export default registerAs('jwt', (): JwtConfig => {
  const config: JwtConfig = {
    secret: process.env['JWT_SECRET'] ?? '',
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '',
    refreshTokenSecret: process.env['REFRESH_TOKEN_SECRET'] ?? '',
    refreshTokenExpiresIn: process.env['REFRESH_TOKEN_EXPIRES_IN'] ?? ''
  }

  const validationSchema = Joi.object<JwtConfig>({
    secret: Joi.string().required(),
    expiresIn: Joi.string().required(),
    refreshTokenSecret: Joi.string().required(),
    refreshTokenExpiresIn: Joi.string().required()
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
