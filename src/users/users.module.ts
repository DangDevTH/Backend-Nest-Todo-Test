import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { UsersService } from './providers/users.service';
import { FindUserProvider } from './providers/find-user.provider';
import { AuthModule } from 'src/auth/auth.module';
import { GetMeUserProvider } from './providers/get-me-user.provider';
import { FindUserByIdProvider } from './providers/find-user-by-id.provider';
import { UpdateUserProvider } from './providers/update-user.provider';
import { DeleteUserProvider } from './providers/delete-user.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindUserProvider, GetMeUserProvider, FindUserByIdProvider, UpdateUserProvider, DeleteUserProvider],
  exports: [UsersService]
})
export class UsersModule {}
