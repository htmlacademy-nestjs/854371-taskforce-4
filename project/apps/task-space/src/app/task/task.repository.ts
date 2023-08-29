import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { TaskInterface } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, TaskInterface> {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public async create(entity: TaskEntity): Promise<TaskInterface> {
    const entityData = entity.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: { connect: [] },
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        },
        category: {
          connect: entityData.category.map(({ categoryId }) => ({ categoryId }))
        }
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  findById(id: number): Promise<TaskInterface | null> {
    return Promise.resolve(undefined);
  }

  remove(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(id: number, entity: TaskEntity): Promise<TaskInterface> {
    return Promise.resolve(undefined);
  }
}
