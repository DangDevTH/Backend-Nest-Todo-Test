import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteTaskResponse } from '../interfaces/delete-task-response.interface';

@Injectable()
export class DeleteTaskProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ) {}

    public async delete(userId: number, taskId: number): Promise<DeleteTaskResponse> {
            let existingTask;
            try {
                existingTask = await this.tasksRepository.findOne({
                    where: { task_id: taskId },
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
    
            if(!existingTask) {
                throw new NotFoundException("ไม่พบข้อมูลงานนี้");
            }
            if (userId !== existingTask.user.user_id) {
                throw new ForbiddenException('คุณไม่มีสิทธิ์ในการลบข้อมูลงานนี้');
            }
            try {
                const taskID = existingTask.task_id;
                await this.tasksRepository.delete(existingTask.task_id);
    
                return { statusCode: 200, message: 'ลบข้อมูลเรียบร้อย', task_id: taskID };
            } catch (error) {
                throw new InternalServerErrorException('เกิดข้อผิดพลาด ไม่สามารถลบความคิดเห็นได้');
            }
    
        }
}
