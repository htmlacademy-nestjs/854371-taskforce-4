import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '@project/shared/authentication';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RequestWithPayload } from '@project/shared/app-types';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiBearerAuth()
  @ApiBody({
    description: 'The comment to create',
    type: CreateCommentDto,
  })
  @ApiResponse({
    description: 'The created comment',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() comment: CreateCommentDto, @Req() { user }: RequestWithPayload) {
    const { sub } = user;
    return this.commentService.createComment(comment, sub);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'The comment id',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiResponse({
    description: 'The deleted comment',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() { user }: RequestWithPayload) {
    const { sub } = user;
    return this.commentService.removeComment(id, sub);
  }

  @ApiParam({
    name: 'taskId',
    description: 'The task id',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'The limit of comments to return',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    description: 'The page of comments to return',
    type: Number,
    example: 1,
  })
  @Get('/:taskId')
  async show(@Param('taskId') taskId: number, @Query() limit?: number, @Query() page?: number) {
    return this.commentService.getComments(taskId, limit, page);
  }
}
