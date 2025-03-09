import { FindUserProvider } from './find-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { GetMeUserProvider } from './get-me-user.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';
import { UserResponse } from '../interfaces/user-response.interface';
import { UpdateUserProvider } from './update-user.provider';
import { DeleteUserResponse } from '../interfaces/delete-user-response.interface';
import { DeleteUserProvider } from './delete-user.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserProvider: FindUserProvider,
    private readonly getMeUserProvider: GetMeUserProvider,
    private readonly findUserByIdProvider: FindUserByIdProvider,
    private readonly updateUserProvider: UpdateUserProvider,
    private readonly deleteUserProviderd: DeleteUserProvider,

  ){}

  public async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async getMe(id: number): Promise<User> {
    return await this.getMeUserProvider.getMe(id);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: number): Promise<User>  {
    return await this.findUserByIdProvider.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return  this.findUserProvider.findUserByEmail(email);
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.updateUserProvider.update(userId, updateUserDto );
  }

  async delete(userId: number): Promise<DeleteUserResponse> {
    return await this.deleteUserProviderd.delete(userId);
  }
}
