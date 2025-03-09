import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findUserByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('กรุณากรอกอีเมล');
    }
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['user_id', 'email', 'password'],
    });

    return user;
    
  }
}
