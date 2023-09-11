import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { ConfigTaskSpaceModule } from '@project/config/task-config';
import { CommentModule } from './comments/comment.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    TaskModule,
    TagModule,
    ConfigTaskSpaceModule,
    CommentModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
