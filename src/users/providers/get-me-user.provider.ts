import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class GetMeUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async getMe(id: number) {
    try {
        const user = await this.usersRepository.findOne({
            where: { user_id: id },
            select: {
              user_id: true,
              email: true,
              username: true
            }
      });

      if (!user) {
        throw new NotFoundException('ไม่พบบัญชีผู้ใช้นี้');
      }

      return user;
    } catch (err) {
      throw new BadRequestException('เกิดข้อผิดพลาดขณะค้นหาผู้ใช้');
    }
  }
}
