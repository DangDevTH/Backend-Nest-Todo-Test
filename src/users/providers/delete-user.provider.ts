import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { DeleteUserResponse } from '../interfaces/delete-user-response.interface';

@Injectable()
export class DeleteUserProvider {
    constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    ) {}

    public async delete(userId: number): Promise<DeleteUserResponse> {
                let existingUser;
                try {
                    existingUser = await this.usersRepository.findOne({
                        where: { user_id: userId },
                    });
                } catch (error) {
                    throw new RequestTimeoutException(
                        'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
                        {
                            description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
                        },
                    );
                }
        
                if(!existingUser) {
                    throw new NotFoundException("ไม่พบข้อมูลผู้ใช้นี้");
                }
                if (userId !== existingUser.user_id) {
                    throw new ForbiddenException('คุณไม่มีสิทธิ์ในการลบข้อมูลนี้');
                }
                try {
                    const UserID = existingUser.user_id;
                    await this.usersRepository.delete(existingUser.user_id);
        
                    return { statusCode: 200, message: 'ลบข้อมูลเรียบร้อย', user_id: UserID };
                } catch (error) {
                    throw new InternalServerErrorException('เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้');
                }
        
            }
}
