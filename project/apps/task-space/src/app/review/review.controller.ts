import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestWithPayload, ReviewInterface, UserRole } from '@project/shared/app-types';
import { ExceptionMessages, JwtAuthGuard } from '@project/shared/authentication';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskRepository } from '../task/task.repository';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly taskRepository: TaskRepository
  ) {
  }

  @ApiBearerAuth()
  @ApiBody({
    description: 'The review to create',
    type: CreateReviewDto,
    required: true,
  })
  @ApiParam({
    name: 'taskId',
    description: 'The task id',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiParam({
    name: 'executorId',
    description: 'The mongo id',
    type: String,
    example: '5f9b3b3b3b3b3b3b3b3b3b3b',
    required: true,
  })
  @ApiResponse({
    description: 'The created review',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/:taskId/:executorId')
  public async create(@Body() review: CreateReviewDto, @Req() { user }: RequestWithPayload, @Param('executorId', MongoIdValidationPipe) executorId: string, @Param('taskId') taskId: number): Promise<ReviewInterface> {
    const { sub, role } = user;

    const exitReview = await this.reviewService.getReviewByTaskId(taskId);
    if (exitReview) {
      throw new HttpException(ExceptionMessages.MULTIPLE_REVIEWS_FOR_SINGLE_TASK_NOT_ALLOWED, HttpStatus.CONFLICT);
    }

    if (role !== UserRole.Executor) {
      throw new HttpException(ExceptionMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const existTask = await this.taskRepository.findById(taskId)
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

  @ApiQuery({
    name: 'limit',
    description: 'The limit of reviews to return',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    description: 'The page of reviews to return',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    description: 'The reviews',
  })
  @Get('/')
  public async index(@Query() limit?: number, @Query() page?: number): Promise<ReviewInterface[]> {
    return this.reviewService.getReviews(limit, page);
  }

  @ApiParam({
    name: 'executorId',
    description: 'The executor id',
    example: '5f9b3b3b3b3b3b3b3b3b3b3b',
    type: String,
    required: true,
  })
  @ApiResponse({
    description: 'The rating',
    type: Number,
  })
  @Get('/:executorId')
  public async showRating(@Param('executorId') executorId: string): Promise<number> {
    return this.reviewService.calculateRating(executorId);
  }
}
