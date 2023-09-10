import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getSimpleJwtOptions } from '@project/config/task-config';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { JwtAccessStrategy } from '@project/shared/authentication';

@Module({
  imports: [
    TaskModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getSimpleJwtOptions
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, JwtAccessStrategy],
  exports: [CommentRepository]
})
export class CommentModule {}
