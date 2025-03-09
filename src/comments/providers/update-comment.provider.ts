import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class UpdateCommentProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
    ) {}

    public async update(userId: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        let existingComment;
        try {
            existingComment = await this.commentsRepository.findOne({
                where: { comment_id : updateCommentDto.comment_id },
                relations: ['user'],
            });
        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }

        if(!existingComment) {
            throw new NotFoundException("ไม่พบความคิดเห็นนี้");
        }

        if (userId !== existingComment.user.user_id) {
            throw new ForbiddenException('คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้');
        }

        existingComment.comment = updateCommentDto.comment ?? existingComment.comment;

        try {
            const savedComment = await this.commentsRepository.save(existingComment);
        
            if (savedComment.task) {
                const keysToDelete = [
                    'user', 'title', 'description', 'status',
                    'priority', 'due_date', 'created_at', 'updated_at'
                ];
                keysToDelete.forEach(key => delete savedComment.task[key]);
            }

            if (savedComment.user) {
                const keysToDelete = [
                    'email', 'created_at', 'updated_at'
                ];
                keysToDelete.forEach(key => delete savedComment.user[key]);
            }


            return savedComment;
        } catch (error) {
            throw new InternalServerErrorException('server เกิดข้อผิดพลาด');
        } 


    }
}
