import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagRepository]
})
export class TagModule {}
