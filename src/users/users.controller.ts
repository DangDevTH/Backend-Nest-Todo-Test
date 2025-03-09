import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './providers/users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user-payload.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(AuthType.None)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("me")
  getMe(@CurrentUser() user: CurrentUserPayload) {
    return this.usersService.getMe(user.user_id);
  }

  // @Get(':id')
  // findOne(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
  //   console.log('user', user)
  //   return { message: '55555555555'};
  // }

  @Patch()
  update(@CurrentUser() user: CurrentUserPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.user_id, updateUserDto);
  }

  @Delete()
  delete(@CurrentUser() user: CurrentUserPayload) {
    return this.usersService.delete(user.user_id);
  }
}
