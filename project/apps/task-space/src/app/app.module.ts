import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { ConfigTaskSpaceModule } from '@project/config/task-config';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    TaskModule,
    TagModule,
    ConfigTaskSpaceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
