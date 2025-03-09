import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user-payload.interface';
import { TasksService } from './providers/tasks.service';
import { QueryPageArgsDto } from './dto/query-page-args-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@CurrentUser() user: CurrentUserPayload, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.user_id, createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('/search')
  search(@Query() query: QueryPageArgsDto) {
    return this.tasksService.search(query.title);
  }

  @Get('/mytask')
  findTaskByUserId(@CurrentUser() user: CurrentUserPayload){
    return this.tasksService.findTaskByUserId(user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }

  @Patch()
  update(@CurrentUser() user: CurrentUserPayload, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(user.user_id, updateTaskDto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: CurrentUserPayload,  @Param('id') id: number) {
    return this.tasksService.delete(user.user_id, id);
  }
}
