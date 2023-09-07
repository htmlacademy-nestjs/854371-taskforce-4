import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { fillObject } from '@project/util/util-core';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.categoryService.getCategory(id);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const existCategories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, existCategories);
  }

  @Post('/')
  async create(category: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(category);
    return fillObject(CategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.categoryService.deleteCategory(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, category);
    return fillObject(CategoryRdo, updatedCategory);
  }
}
