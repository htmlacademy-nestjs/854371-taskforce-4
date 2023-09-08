import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getSimpleJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('simple-jwt.secret'),
    signOptions: {
      expiresIn: configService.get<string>('simple-jwt.expiresIn'),
      algorithm: 'HS256',
    }
  }
}
