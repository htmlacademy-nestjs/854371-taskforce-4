import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    TaskModule,
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
