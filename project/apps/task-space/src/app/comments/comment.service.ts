import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentInterface } from '@project/shared/app-types';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { ExceptionMessages } from '@project/shared/authentication';
import { TaskRepository } from '../task/task.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly taskRepository: TaskRepository
  ) {
  }

  public async createComment(comment: CreateCommentDto, userId: string): Promise<CommentInterface> {
    const entity = new CommentEntity({ ...comment, userId });

    const task = await this.taskRepository.findById(comment.taskId);

    if (task) {
      const result = await this.commentRepository.create(entity);
      return fillObject(CommentRdo, result);
    }

    throw new HttpException(`Task with id ${comment.taskId} not found`, HttpStatus.NOT_FOUND);
  }

  public async removeComment(id: number, userId: string): Promise<void> {
    const exist = await this.commentRepository.findById(id);
    if (!exist) {
      throw new HttpException(`Comment with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    if (exist.userId !== userId) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_UPDATE, HttpStatus.FORBIDDEN);
    }
    await this.commentRepository.remove(id);
  }

  public async getComments(taskId: number, limit: number, page: number) {
    return this.commentRepository.findCommentsByTaskId(taskId, limit, page);
  }
}
