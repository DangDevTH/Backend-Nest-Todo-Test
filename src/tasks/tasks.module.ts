import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskProvider } from './providers/create-task.provider';
import { TasksService } from './providers/tasks.service';
import { UsersModule } from 'src/users/users.module';
import { FindTaskByIdProvider } from './providers/find-task-by-id.provider';
import { UpdateTaskProvider } from './providers/update-task.provider';
import { DeleteTaskProvider } from './providers/delete-task.provider';
import { FindTaskByUserIdProvider } from './providers/find-task-by-user-id.provider';
import { FindAllTaskProvider } from './providers/find-all-task.provider';
import { SearchTaskProvider } from './providers/search-task.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, CreateTaskProvider, FindTaskByIdProvider, UpdateTaskProvider, DeleteTaskProvider, FindTaskByUserIdProvider, FindAllTaskProvider, SearchTaskProvider],
  exports: [TasksService]
})
export class TasksModule {}
