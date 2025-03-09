import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllTaskProvider {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  public async findAll(): Promise<Task[]> {
    try {
      const task = await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
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
      throw new InternalServerErrorException('server เกิดข้อผิดพลาด');
    }
  }
}
