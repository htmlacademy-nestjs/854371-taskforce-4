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
  async show(@Param('id') id: string) {
    const numberId = parseInt(id, 10);
    const existCategory = await this.categoryService.getCategory(numberId);
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
  async delete(@Param('id') id: string) {
    const numberId = parseInt(id, 10);
    await this.categoryService.deleteCategory(numberId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    const numberId = parseInt(id, 10);
    const updatedCategory = await this.categoryService.updateCategory(numberId, category);
    return fillObject(CategoryRdo, updatedCategory);
  }
}
