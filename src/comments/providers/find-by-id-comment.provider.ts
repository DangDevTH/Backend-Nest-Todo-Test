import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByIdCommentProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
    ){}

    public async findById(commentId: number): Promise<Comment> {
        let existingComment;
        try {
            existingComment = await this.commentsRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.task', 'task')
            .where('comment.comment_id = :commentId', { commentId })
            .select([
                'comment.comment_id',
                'comment.comment',
                'comment.created_at',
                'comment.updated_at',
                'user.user_id',
                'user.username', 
                'task.task_id'
            ]).getOne();
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

        try {
            return await existingComment;
        } catch (error) {
             throw new InternalServerErrorException('server เกิดข้อผิดพลาด');
        }


    }
}
