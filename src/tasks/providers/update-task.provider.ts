import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class UpdateTaskProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    public async update(userId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        let existingTask;
        try {
            existingTask = await await this.tasksRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .where('task.task_id = :taskId', { taskId: updateTaskDto.task_id })
            .select([
                'task.task_id',
                'task.title',
                'task.description',
                'task.status',
                'task.priority',
                'task.due_date',
                'task.created_at',
                'task.updated_at',
                'user.user_id',
                'user.username',
            ])
            .getOne();
        } catch (error) {
            throw new RequestTimeoutException(
                'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                {
                    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                },
            );
        }

        if(!existingTask) {
            throw new NotFoundException("ไม่พบข้อมูลงานนี้");
        }

        if (userId !== existingTask.user.user_id) {
            throw new ForbiddenException('คุณไม่มีสิทธิ์แก้ไขข้อมูลงานนี้');
        }

        existingTask.title = updateTaskDto.title ?? existingTask.title;
        existingTask.description = updateTaskDto.description ?? existingTask.description;
        existingTask.priority = updateTaskDto.priority ?? existingTask.priority;
        existingTask.status = updateTaskDto.status ?? existingTask.status;
        existingTask.due_date = updateTaskDto.due_date ?? existingTask.due_date;

        try {
            return await this.tasksRepository.save(existingTask);;
        } catch (error) {
            throw new InternalServerErrorException('เกิดข้อผิดพลาดในการอัพเดตข้อมูลงาน');
        } 

    }
}
