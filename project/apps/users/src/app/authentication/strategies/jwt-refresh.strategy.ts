import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { jwtConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { AuthenticationService } from '../authentication.service';
import { TokenPayloadInterface } from '@project/shared/app-types';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public validate(payload: TokenPayloadInterface) {
    return this.authService.getUser(payload.sub);
  }
}
