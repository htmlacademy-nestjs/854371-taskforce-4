import { ReviewRepository } from './review.repository';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../task/task.repository';
import { ReviewInterface } from '@project/shared/app-types';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async create(review: CreateReviewDto, executorId: string, taskSub: number): Promise<ReviewInterface> {
    const entity = new ReviewEntity({ ...review, executorId, taskSub });
    return this.reviewRepository.create(entity);
  }

  public async getReviews(limit?: number, page?: number): Promise<ReviewInterface[]> {
    return this.reviewRepository.getReviews(limit, page);
  }

  public async calculateRating(executorId: string): Promise<number> {
    const reviews = await this.reviewRepository.findAllByExecutorId(executorId);
    const getFailCounter = await this.taskRepository.getCountFailTaskByExecutorId(executorId)

    const summary = reviews.reduce((acc, review) => acc + review.assessment, 0);

    const rating = summary / reviews.length + getFailCounter;

    return parseFloat(rating.toString(2))
  }

  public async getReviewByTaskId(taskId: number): Promise<ReviewInterface> {
    return this.reviewRepository.findByTaskId(taskId);
  }
}
