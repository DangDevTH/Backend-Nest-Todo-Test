import { Response } from 'express';
import { UserLoginDto } from './../dto/user-login.dto';
import { LoginProvider } from './login.provider';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CurrentUserPayload } from '../interfaces/current-user-payload.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly loginProvider: LoginProvider,
  ) {}

  public async login({ email, password }: UserLoginDto, response: Response): Promise<Response<LoginResponse>> {
    return this.loginProvider.login(email, password, response);
  }

  public async validateJwtUser(email: string) {
    let user;
    try {
      user = await this.usersService.findByEmail(email);
    } catch (err) {
      throw new RequestTimeoutException(
        'ไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง',
        {
            description: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล',
        },
      );
    }
    if(!user) throw new UnauthorizedException("Unauthorized");

    const currentUser: CurrentUserPayload = { user_id: user.user_id ,email: user.email};
    return currentUser;
  }
}
