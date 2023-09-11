import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { fillObject } from '@project/util/util-core';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @ApiParam({
    name: 'id',
    description: 'The id of the category',
    example: '1',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category with the specified id',
    type: CategoryRdo,
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.categoryService.getCategory(id);
    return fillObject(CategoryRdo, existCategory);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of categories',
    type: [CategoryRdo],
  })
  @Get('/')
  async index() {
    const existCategories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, existCategories);
  }

  @ApiBody({
    description: 'The category to create',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The created category',
    type: CategoryRdo,
  })
  @Post('/')
  async create(@Body() category: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(category);
    return fillObject(CategoryRdo, newCategory);
  }

  @ApiParam({
    name: 'id',
    description: 'The id of the category',
    example: '1',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The category was deleted',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.categoryService.deleteCategory(id);
  }

  @ApiParam({
    name: 'id',
    description: 'The id of the category',
    example: '1',
    type: Number,
    required: true,
  })
  @ApiBody({
    description: 'The category to update',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated category',
    type: CategoryRdo,
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, category);
    return fillObject(CategoryRdo, updatedCategory);
  }
}
