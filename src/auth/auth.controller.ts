import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { AuthService } from './providers/auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('logout')
  @HttpCode(200)
  logout(@Res() response: Response) {
    try {
        response.cookie('Authorization', '', {
        httpOnly: true,
        sameSite: 'strict',
        });
      
        return response.status(200).json({
        statusCode: 200,
        message: 'ออกระบบเรียบร้อย',
        });
    } catch (error) {
        return response.status(500).json({
        statusCode: 500,
        message: 'เกิดข้อผิดพลาด',
        });
    }
  }

  @Post('login')
  @HttpCode(200)
  @Auth(AuthType.None)
  register(@Body() userLoginDto: UserLoginDto, @Res() response: Response) {
    return this.authService.login(userLoginDto, response);
  }
}
