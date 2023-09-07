import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TasksUserModule } from '../tasks-user/tasks-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TasksUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [ AuthenticationController ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy
  ]
})
export class AuthenticationModule {
}
