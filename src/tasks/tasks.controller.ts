import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../users/get-user.decorator';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';
import { User } from '../users/entities/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getAllTasks(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get('/:id')
  async getTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Post('/')
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.delete(id, user);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete('')
  async deleteTasks() {
    return this.tasksService.deleteAll();
  }
}
