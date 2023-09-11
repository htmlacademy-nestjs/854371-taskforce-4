import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Controller, Get, HttpException, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestWithPayload, ReviewInterface, UserRole } from '@project/shared/app-types';
import { ExceptionMessages, JwtAuthGuard } from '@project/shared/authentication';
import { TaskService } from '../task/task.service';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly taskService: TaskService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:taskId/:executorId')
  public async create(review: CreateReviewDto, @Req() { user }: RequestWithPayload, @Param('executorId', MongoIdValidationPipe) executorId: string, @Param('taskId') taskId: number): Promise<ReviewInterface> {
    const { sub, role } = user;

    const exitReview = await this.reviewService.getReviewByTaskId(taskId);
    if (exitReview) {
      throw new HttpException(ExceptionMessages.MULTIPLE_REVIEWS_FOR_SINGLE_TASK_NOT_ALLOWED, HttpStatus.CONFLICT);
    }

    if (role !== UserRole.Executor) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskService.getTask(taskId);
    if (!existTask) {
      throw new HttpException(ExceptionMessages.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (existTask.userId !== sub) {
      throw new HttpException(ExceptionMessages.FORBIDDEN_UPDATE, HttpStatus.FORBIDDEN);
    }

    if (existTask.selectedExecutor !== executorId) {
      throw new HttpException(ExceptionMessages.EXECUTOR_TASK_INCOMPLETE_ERROR, HttpStatus.BAD_REQUEST);
    }

    return this.reviewService.create(review, sub, taskId);
  }

  @Get('/')
  public async index(@Query() limit?: number, @Query() page?: number): Promise<ReviewInterface[]> {
    return this.reviewService.getReviews(limit, page);
  }

  @Get('/:executorId')
  public async showRating(@Param('executorId') executorId: string): Promise<number> {
    return this.reviewService.calculateRating(executorId);
  }
}
