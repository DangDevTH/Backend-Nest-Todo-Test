import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from './../../users/providers/users.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoginProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async login(email: string, password: string, response: Response) {
    let user;
    let isEqual: boolean = false;
    if (!email || !password) {
        throw new BadRequestException('Email and password are required');
    }

    try {
      user = await this.usersService.findByEmail(email);
    } catch (error) {
      console.log('error', error)
      throw new RequestTimeoutException(
        'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
        {
            description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
        },
    );
    }

    if(!user) {
        throw new BadRequestException('ไม่พบอีเมลนี้');
    }

    try {
        isEqual = await this.hashingProvider.comparePassword(
          password,
          user.password,
        );
      } catch (error) {
        throw new RequestTimeoutException(error, {
          description: 'Could not compare the password',
        });
      }

      if (!isEqual) {
        throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }

     return await this.generateTokensProvider.generateTokens(user, response);

  }
}
