import { HttpCode, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Response } from 'express';
import { LoginResponse } from '../interfaces/login-response.interface';



@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {}

    public async signToken<T>(userId: number, expiresIn: number, playload?: T) {
        return this.jwtService.signAsync(
            {
                sub: userId,
                ...playload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

    public async generateTokens(user: User, response: Response): Promise<Response<LoginResponse>> {
        if (!user) {
          throw new NotFoundException('User data is required');
        }
        try {
          const accessToken = await this.signToken<Partial<ActiveUserData>>(
            user.user_id,
            this.jwtConfiguration.accessTokenTtl,
            { email: user.email },
          );
    
          await response.cookie('Authorization', `Bearer ${accessToken}`, {
            httpOnly: true,
            sameSite: 'strict',
          });
    
          return response.status(200).json({
            statusCode: 200,
            message: 'เข้าสู่ระบบสำเร็จ',
          });
        } catch (err) {
          return response.status(500).json({
            statusCode: 500,
            message: 'เกิดข้อผิดพลาด',
          });
        }
      }
}
