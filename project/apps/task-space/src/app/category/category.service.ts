import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from '@project/shared/app-types';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<CategoryInterface> {
    const categoryEntity = new CategoryEntity(category);
    return this.categoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.remove(id);
  }

  async getCategory(id: number): Promise<CategoryInterface | null> {
    return this.categoryRepository.findById(id);
  }

  async getCategories(ids: number[] = []): Promise<CategoryInterface[]> {
    return this.categoryRepository.find(ids);
  }

  async updateCategory(id: number, category: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.categoryRepository.update(id, new CategoryEntity(category));
  }
}
