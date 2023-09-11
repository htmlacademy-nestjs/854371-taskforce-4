import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getSimpleJwtOptions } from '@project/config/task-config';
import { JwtAccessStrategy } from '@project/shared/authentication';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TaskModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getSimpleJwtOptions
    }),
  ],
  controllers: [
    ReviewModule
  ],
  providers: [ReviewService, ReviewRepository, JwtAccessStrategy],
  exports: []
})
export class ReviewModule {}
