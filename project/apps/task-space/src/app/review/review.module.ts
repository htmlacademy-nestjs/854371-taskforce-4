import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getSimpleJwtOptions } from '@project/config/task-config';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { JwtAccessStrategy } from '@project/shared/authentication';

@Module({
  imports: [
    TaskModule,
    JwtModule.registerAsync({
      inject: [ ConfigService ],
      useFactory: getSimpleJwtOptions
    }),
  ],
  controllers: [ ReviewController ],
  providers: [ ReviewService, ReviewRepository, JwtAccessStrategy ],
  exports: [ ReviewRepository ]
})
export class ReviewModule {
}
