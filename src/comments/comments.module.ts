import { Module } from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentProvider } from './providers/create-comment.provider';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UpdateCommentProvider } from './providers/update-comment.provider';
import { DeleteCommentProvider } from './providers/delete-comment.provider';
import { FindAllCommentProvider } from './providers/find-all-comment.provider';
import { FindByIdCommentProvider } from './providers/find-by-id-comment.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UsersModule,
    TasksModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CreateCommentProvider, UpdateCommentProvider, DeleteCommentProvider, FindAllCommentProvider, FindByIdCommentProvider],
})
export class CommentsModule {}
