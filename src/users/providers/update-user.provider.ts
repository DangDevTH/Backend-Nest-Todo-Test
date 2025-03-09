import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    public async update(
        userId: number,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        let existingUser;
        try {
            existingUser = await await this.usersRepository
                .createQueryBuilder('user')
                .where('user.user_id = :userId', { userId })
                .select([
                    'user.created_at',
                    'user.updated_at',
                    'user.user_id',
                    'user.email',
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

        if (!existingUser) {
            throw new NotFoundException('ไม่พบข้อมูลผู้ใช้นี้');
        }

        if (userId !== existingUser.user_id) {
            throw new ForbiddenException('คุณไม่มีสิทธิ์แก้ไขข้อมูลผู้ใช้นี้');
        }

        existingUser.username = updateUserDto.username ?? existingUser.username;

        try {
            return await this.usersRepository.save(existingUser);
        } catch (error) {
            throw new InternalServerErrorException(
                'เกิดข้อผิดพลาดในการอัพเดตข้อมูลผู้ใช้',
            );
        }
    }
}
