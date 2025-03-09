import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}
    
      public async findById(id: number) {
        let user;
        try {
           user = await this.usersRepository.findOne({
                where: { user_id: id },
                select: {
                  user_id: true,
                  username: true
                }
            });
    
          if (!user) {
            throw new NotFoundException(`ไม่พบข้อมูลผู้ใช้นี้`);
          }
    
          return user;
        } catch (err) {
          throw new BadRequestException('เกิดข้อผิดพลาด');
        }
      }
}
