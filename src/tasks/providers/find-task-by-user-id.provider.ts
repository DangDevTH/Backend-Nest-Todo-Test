import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindTaskByUserIdProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ) { }

    public async findTaskByUserId(userId: number): Promise<Task[]> {
        try {
            const task = await this.tasksRepository.createQueryBuilder('task')
                .leftJoinAndSelect('task.user', 'user')
                .where('user.user_id = :userId', { userId })
                .orderBy('task.created_at', 'DESC')
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
                .getMany();

            return task;

        } catch (error) {
            throw new BadRequestException("เกิดข้อผิดพลาด");
        }
    }

}
