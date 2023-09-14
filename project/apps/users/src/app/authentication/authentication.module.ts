import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TasksUserModule } from '../tasks-user/tasks-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtAccessStrategy } from '@project/shared/authentication';

@Module({
  imports: [
    TasksUserModule,
    JwtModule.registerAsync({
      inject: [ ConfigService ],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule
  ],
  controllers: [ AuthenticationController ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtRefreshStrategy,
    JwtAccessStrategy
  ]
})
export class AuthenticationModule {
}
