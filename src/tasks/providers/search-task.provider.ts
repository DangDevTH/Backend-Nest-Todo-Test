import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SearchTaskProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ){}

    public async search(title: string): Promise<Task[]> {
        try {
            const tasks = await this.tasksRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .where('task.title ILIKE :title', {title: `%${title}%`})
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

            return tasks;
        } catch (error) {
            throw new InternalServerErrorException("server เกิดข้อผิดพลาด");
        }
    }
}
