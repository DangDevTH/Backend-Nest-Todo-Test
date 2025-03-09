import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class HttpAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
      if (context.getType() === 'http') {
        // console.log('getRequest()', context.switchToHttp().getRequest());
        // console.log('context.getType()',context.getType());
        const httpRequest = context.switchToHttp().getRequest();
        return httpRequest;
      }
  
      throw new UnauthorizedException('Authentication token is required');
    }


  }
  