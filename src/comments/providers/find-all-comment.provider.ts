import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksService } from 'src/tasks/providers/tasks.service';

@Injectable()
export class FindAllCommentProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        private readonly tasksService: TasksService,
    ){}

    public async findAll(taskId: number, skip: number):  Promise<{ data: Comment[], countComment: number }> {
        let existingTask;

        try {
            existingTask = await this.tasksService.findById(taskId);
        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }

        if(!existingTask) {
            throw new NotFoundException(`ไม่พบข้อมูล TaskID: ${taskId}`);
        }

        try {
            const [data, countComment] = await this.commentsRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.task', 'task')
            .where('comment.task_id = :taskId', { taskId })
            .skip(skip)
            .take(10)
            .orderBy('comment.created_at', "ASC")
            .select([
                'comment.comment_id',
                'comment.comment',
                'comment.created_at',
                'comment.updated_at',
                'user.user_id',
                'user.username', 
                'task.task_id',
            ])
            .getManyAndCount();

            return { data, countComment };

        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }
    }
}
