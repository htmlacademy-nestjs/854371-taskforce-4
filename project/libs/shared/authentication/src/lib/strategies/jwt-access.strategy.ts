import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayloadInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') ?? configService.get<string>('simple-jwt.secret')
    });
    console.log(configService.get<string>('jwt.secret'), configService.get<string>('simple-jwt.secret'));
  }

  public async validate(payload: TokenPayloadInterface) {
    return payload;
  }
}
