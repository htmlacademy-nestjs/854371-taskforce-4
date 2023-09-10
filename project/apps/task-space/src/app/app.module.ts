import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { ConfigTaskSpaceModule } from '@project/config/task-config';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    TaskModule,
    TagModule,
    ConfigTaskSpaceModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
