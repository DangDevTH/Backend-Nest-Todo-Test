import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResponse } from '../interfaces/delete-response.interface';

@Injectable()
export class DeleteCommentProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
    ){}

    public async delete(userId: number, id: number): Promise<DeleteResponse> {
        let existingComment;
        try {
            existingComment = await this.commentsRepository.findOne({
                where: { comment_id: id },
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
            throw new ForbiddenException('คุณไม่มีสิทธิ์ในการลบความคิดเห็นนี้');
        }
        try {
            const commentId = existingComment.comment_id;
            await this.commentsRepository.delete(existingComment.comment_id);

            return { statusCode: 200, message: 'ลบความคิดเห็นเรียบร้อย', comment_id: commentId };
        } catch (error) {
            throw new InternalServerErrorException('เกิดข้อผิดพลาด ไม่สามารถลบความคิดเห็นได้');
        }

    }
}
