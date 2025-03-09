import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TasksService } from 'src/tasks/providers/tasks.service';


@Injectable()
export class CreateCommentProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
    ) { }

    public async create(
        userId: number,
        createCommentDto: CreateCommentDto,
    ): Promise<Comment> {
        let user;
        let task;
        try {
            task = await this.tasksService.findById(createCommentDto.task_id);
        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }

        if(!task){
            throw new NotFoundException("ไม่พบข้อมูลงาน");
        }

        try {
            user = await this.usersService.findById(userId);
        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }

                
        if(!user){
            throw new NotFoundException("ไม่พบข้อมูลผู้ใช้");
        }

        let comment = await this.commentsRepository.create({
            comment: createCommentDto.comment,
            user,
            task
        });

        try {
            const savedComment = await this.commentsRepository.save(comment);
    
            if (savedComment.task) {
                delete savedComment.task.user;
                delete savedComment.task.title;
                delete savedComment.task.description;
                delete savedComment.task.status;
                delete savedComment.task.priority;
                delete savedComment.task.due_date;
                delete savedComment.task.created_at;
                delete savedComment.task.updated_at;
            }
            return savedComment;
        } catch (error) {
            throw new InternalServerErrorException('ไม่สามารถบันทึกความคิดเห็นได้');
        } 

    }
}
