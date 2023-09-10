import { CommentEntity } from './comment.entity';
import { CommentInterface } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

const MAX_LIMIT = 500;
const DEFAULT_LIMIT = 50;

@Injectable()
export class CommentRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(entity: CommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.create({
      data: { ...entity.toObject() }
    })
  }

  async remove(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { commentId: id }
    })
  }

  async update(id: number, entity: CommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.update({
      where: { commentId: id },
      data: { ...entity.toObject(), commentId: id }
    })
  }

  async findById(id: number): Promise<CommentInterface | null> {
    return this.prisma.comment.findFirst({
      where: { commentId: id }
    })
  }

  async findCommentsByTaskId(taskId: number, limit: number = DEFAULT_LIMIT, page: number): Promise<CommentInterface[] | null> {
    const updatedLimit = limit > MAX_LIMIT ? MAX_LIMIT : limit
    return this.prisma.comment.findMany({
      where:
        { taskId },
      orderBy: {
        commentId: 'desc'
      },
      take: updatedLimit,
      skip: page > 0 ? updatedLimit * (page - 1) : undefined,
    })
  }
}
