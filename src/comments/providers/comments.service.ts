import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentProvider } from './create-comment.provider';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentProvider } from './update-comment.provider';
import { DeleteCommentProvider } from './delete-comment.provider';
import { DeleteResponse } from '../interfaces/delete-response.interface';
import { FindAllCommentProvider } from './find-all-comment.provider';
import { FindByIdCommentProvider } from './find-by-id-comment.provider';

@Injectable()
export class CommentsService {
  constructor(
    private readonly createCommentProvider: CreateCommentProvider,
    private readonly updateCommentProvider: UpdateCommentProvider,
    private readonly deleteCommentProvider: DeleteCommentProvider,
    private readonly findAllCommentProvider: FindAllCommentProvider,
    private readonly findByIdCommentProvider: FindByIdCommentProvider,
  ){}

  async create(userId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.createCommentProvider.create(userId, createCommentDto);
  }

  async findById(commentId: number): Promise<Comment> {
     return await this.findByIdCommentProvider.findById(commentId);
  }

  async findAll(taskId: number, skip: number): Promise<{ data: Comment[], countComment: number }> {
    return await this.findAllCommentProvider.findAll(taskId, skip);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return await this.updateCommentProvider.update(id, updateCommentDto);
  }

  async delete(userId: number, id: number): Promise<DeleteResponse> {
    return await this.deleteCommentProvider.delete(userId, id);
  }
}
