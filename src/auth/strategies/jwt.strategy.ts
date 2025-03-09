import { AuthService } from './../providers/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies['Authorization']?.split(' ')[1] ?? ''; 
          if(!token) throw new UnauthorizedException('Unauthorized');
          return token;
        },
      ]),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  validate(payload: TokenPayload) {
    try {
      return this.authService.validateJwtUser(payload.email);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
