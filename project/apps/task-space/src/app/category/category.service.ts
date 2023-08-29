import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from '@project/shared/app-types';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly taskRepository: CategoryRepository
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<CategoryInterface> {
    const categoryEntity = new CategoryEntity(category);
    return this.taskRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.taskRepository.remove(id);
  }

  async getCategory(id: number): Promise<CategoryInterface | null> {
    return this.taskRepository.findById(id);
  }

  async getCategories(ids: number[] = []): Promise<CategoryInterface[]> {
    return this.taskRepository.find(ids);
  }

  async updateCategory(id: number, category: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.taskRepository.update(id, new CategoryEntity(category));
  }
}
