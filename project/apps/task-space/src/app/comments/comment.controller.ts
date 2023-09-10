import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '@project/shared/authentication';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RequestWithPayload } from '@project/shared/app-types';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() comment: CreateCommentDto, @Req() { user }: RequestWithPayload) {
    const { sub } = user;
    return this.commentService.createComment(comment, sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() { user }: RequestWithPayload) {
    const { sub } = user;
    return this.commentService.removeComment(id, sub);
  }

  @Get('/:taskId')
  async show(@Param('taskId') taskId: number, @Query() limit?: number, @Query() page?: number) {
    return this.commentService.getComments(taskId, limit, page);
  }
}
