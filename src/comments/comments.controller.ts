import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user-payload.interface';
import { PaginationArgsCommentDto } from './dto/pagination-args-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@CurrentUser() user, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(user.user_id ,createCommentDto);
  }

  // http://localhost:3001/comments/?taskId=1&skip=10
  @Get()
  findAll(
    @Query() query: PaginationArgsCommentDto
  ){
    return this.commentsService.findAll(
      query.taskId, 
      query.skip
    );
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.commentsService.findById(id);
  }

  @Patch()
  update(@CurrentUser() user: CurrentUserPayload , @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(user.user_id, updateCommentDto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: CurrentUserPayload, @Param('id') id: number) {
    return this.commentsService.delete(user.user_id, id);
  }
}
