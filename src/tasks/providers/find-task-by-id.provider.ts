import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class FindTaskByIdProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ){}

    public async findById(taskId: number): Promise<Task> {
        try {
            const task = await this.tasksRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .where('task.task_id = :taskId', { taskId })
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

            return task;

        } catch (error) {
            throw new BadRequestException("เกิดข้อผิดพลาด");
        }
    }
}
