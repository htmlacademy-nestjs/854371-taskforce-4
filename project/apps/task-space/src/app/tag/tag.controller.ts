import { TagService } from './tag.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { fillObject } from '@project/util/util-core';
import { TagInterface } from '@project/shared/app-types';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {
  }

  @ApiBody({
    description: 'The tag to create',
    type: CreateTagDto,
    required: true,
  })
  @ApiResponse({
    description: 'The created tag',
    type: TagRdo,
  })
  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const createdTag = await this.tagService.createTag(dto);
    return fillObject(TagRdo, createdTag);
  }

  @ApiParam({
    name: 'param',
    description: 'The tag id or name',
    type: String,
    example: '1 | urgent',
    required: true,
  })
  @ApiResponse({
    description: 'The tag',
    type: TagRdo,
  })
  @Get('/:param')
  async show(@Param('param') param: string) {
    let existTag: TagInterface | null;

    if (!isNaN(Number(param))) {
      const id = Number(param);
      existTag = await this.tagService.getTag(id);
    } else {
      existTag = await this.tagService.getTagByName(param);
    }

    return fillObject(TagRdo, existTag);
  }

  @ApiQuery({
    name: 'ids',
    description: 'The tag ids',
    type: Array,
    example: '1,2,3',
    required: true,
  })
  @ApiResponse({
    description: 'The tags',
    type: [ TagRdo ],
  })
  @Get('/')
  async showMany(@Query('ids') query: string) {
    const ids = query.split(',').map((id) => parseInt(id, 10));
    const existTags = await this.tagService.getTagsByIds(ids);

    return fillObject(TagRdo, existTags);
  }


  @ApiParam({
    name: 'id',
    description: 'The tag id',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiResponse({
    description: 'The deleted tag',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.tagService.deleteTag(id);
  }


  @ApiParam({
    name: 'id',
    description: 'The tag id',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiBody({
    description: 'The tag to update',
    type: CreateTagDto,
    required: true,
  })
  @ApiResponse({
    description: 'The tag',
    type: TagRdo,
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: CreateTagDto) {
    const updatedTag = await this.tagService.updateTag(id, dto);
    return fillObject(TagRdo, updatedTag);
  }
}
