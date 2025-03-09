import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class CreateTaskProvider {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        private readonly usersService: UsersService,
    ){}

    public async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
        let user;
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
            throw new NotFoundException('ไม่พบบัญชีผู้ใช้นี้');
        }


        let task = this.tasksRepository.create({
            user,
            ...createTaskDto,
        });

        try {
            return await this.tasksRepository.save(task);
        } catch (error) {
            throw new InternalServerErrorException('เกิดข้อผิดพลาด ไม่สามารถบันทึกงานได้');
        }
    }

}
