import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    let user;

    if(createUserDto.password !== createUserDto.password_confirm) {
        throw new ConflictException('Passwords do not match.');
    }

    try {
      user = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (err) {
      throw new RequestTimeoutException(
        'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
        {
            description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
        },
    );
    }

    if (user) {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    let newUser = this.usersRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      await this.usersRepository.save(newUser);

      return { statusCode: 201, message: "สมัครสมาชิกสำเร็จ" }
    } catch (error) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาด ไม่สามารถสร้างบัญชีผู้ใช้ได้กรุณาลองใหม่อีกครั้งในภายหลัง');
    }
  }
}
