import { TagService } from './tag.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { fillObject } from '@project/util/util-core';
import { TagInterface } from '@project/shared/app-types';

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {}

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const createdTag = await this.tagService.createTag(dto);
    return fillObject(TagRdo, createdTag);
  }

  @Get('/:param')
  async show(@Param('param') param: string) {
    let existTag: TagInterface | null;

    // Проверяем, является ли параметр числом (ID)
    if (!isNaN(Number(param))) {
      const id = Number(param);
      existTag = await this.tagService.getTag(id);
    } else {
      existTag = await this.tagService.getTagByName(param);
    }

    return fillObject(TagRdo, existTag);
  }

  @Get('/')
  async showMany(@Query('ids') query: string) {
    const ids = query.split(',').map((id) => parseInt(id, 10));
    const existTags = await this.tagService.getTagsByIds(ids);

    return fillObject(TagRdo, existTags);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.tagService.deleteTag(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: CreateTagDto) {
    const updatedTag = await this.tagService.updateTag(id, dto);
    return fillObject(TagRdo, updatedTag);
  }
}
