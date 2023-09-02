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
          connect: {
            categoryId: entityData.category.categoryId
          }
        }
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async findById(id: number): Promise<TaskInterface | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId: id
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async remove(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId: id
      }
    });
  }

  public async update(_id: number, _entity: TaskEntity): Promise<TaskInterface> {
    return Promise.resolve(undefined);
  }

  public async find(): Promise<TaskInterface[]> {
    return this.prisma.task.findMany({
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }
}
