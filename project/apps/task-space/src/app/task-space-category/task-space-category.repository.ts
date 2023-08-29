import { CRUDRepository } from '@project/util/util-types';
import { TaskSpaceCategoryEntity } from './task-space-category.entity';
import { CategoryInterface } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskSpaceCategoryRepository implements CRUDRepository<TaskSpaceCategoryEntity, number, CategoryInterface> {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(entity: TaskSpaceCategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.create({
      data: { ...entity.toObject() }
    });
  }

  public async remove(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: { categoryId: id }
    });
  }

  public async update(id: number, entity: TaskSpaceCategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.update({
      where: { categoryId: id },
      data: { ...entity.toObject(), categoryId: id }
    });
  }

  public async findById(id: number): Promise<CategoryInterface | null> {
    return this.prisma.category.findFirst({
      where:
        { categoryId: id }
    });
  }

  public async find(ids: number[] = []): Promise<CategoryInterface[]> {
    return this.prisma.category.findMany({
      where: {
        categoryId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }
}
