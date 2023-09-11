import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { ReviewInterface } from '@project/shared/app-types';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(entity: ReviewEntity): Promise<ReviewInterface> {
    return this.prisma.review.create({
      data: {
        ...entity.toObject(),
        task: {
          connect: {
            taskId: entity.taskSub
          }
        }
      },
    });
  }

  public async findAllByExecutorId(userId: string): Promise<ReviewInterface[]> {
    return this.prisma.review.findMany({
      where: {
        executorId: userId
      }
    });
  }

  public async getReviews(limit: number = 50, page?: number): Promise<ReviewInterface[]> {
    const updatedLimit = limit <= 500 ? limit : 500
    return this.prisma.review.findMany({
      take: updatedLimit,
      skip: page > 0 ? updatedLimit * (page - 1) : undefined,
    });
  }

  public async findByTaskId(taskId: number): Promise<ReviewInterface> {
    return this.prisma.review.findFirst({
      where: {
        taskId: taskId
      }
    });
  }
}
