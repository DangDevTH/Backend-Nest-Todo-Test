import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { CreateTaskProvider } from './create-task.provider';
import { FindTaskByIdProvider } from './find-task-by-id.provider';
import { UpdateTaskProvider } from './update-task.provider';
import { DeleteTaskResponse } from '../interfaces/delete-task-response.interface';
import { DeleteTaskProvider } from './delete-task.provider';
import { FindTaskByUserIdProvider } from './find-task-by-user-id.provider';
import { FindAllTaskProvider } from './find-all-task.provider';
import { SearchTaskProvider } from './search-task.provider';

@Injectable()
export class TasksService {
  constructor(
    private readonly createTaskProvider: CreateTaskProvider,
    private readonly findTaskByIdProvider: FindTaskByIdProvider,
    private readonly updateTaskProvider: UpdateTaskProvider,
    private readonly deleteTaskProvider: DeleteTaskProvider,
    private readonly findTaskByUserIdProvider: FindTaskByUserIdProvider,
    private readonly findAllTaskProvider: FindAllTaskProvider,
    private readonly searchTaskProvider: SearchTaskProvider,
    
  ){}

  async create(userId: number ,createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.createTaskProvider.create(userId, createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return await this.findAllTaskProvider.findAll();
  }

  async search(title: string): Promise<Task[]> {
    return await this.searchTaskProvider.search(title);
  }

  async findById(id: number): Promise<Task> {
    return this.findTaskByIdProvider.findById(id);
  }

  async findTaskByUserId(userId: number): Promise<Task[]> {
    return await this.findTaskByUserIdProvider.findTaskByUserId(userId);
  }

  async update(userId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.updateTaskProvider.update(userId, updateTaskDto);
  }

  async delete(userId: number, taskId: number): Promise<DeleteTaskResponse> {
    return await this.deleteTaskProvider.delete(userId, taskId);
  }
}
