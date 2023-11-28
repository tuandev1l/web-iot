import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async findAll(user: User): Promise<Task[]> {
    // use this
    // return this.taskRepository.find({ where: { id: user.id } });
    // OR
    return this.taskRepository.findBy({ user });
  }

  async findOne(id: string, user: User): Promise<Task> {
    return this.taskRepository.findOneByOrFail({ id, user });
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { description, title } = createTaskDto;

    const task = this.taskRepository.create({
      description,
      title,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async delete(id: string, user: User): Promise<void> {
    const { affected } = await this.taskRepository.delete({
      id,
      user,
    });
    if (!affected) throw new NotFoundException();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User
  ): Promise<Task> {
    const task = await this.findOne(id, user);
    const { description, status, title } = updateTaskDto;

    task.description = description;
    task.status = status;
    task.title = title;

    await this.taskRepository.save(task);
    return task;
  }

  async deleteAll(): Promise<void> {
    await this.taskRepository.delete({});
  }
}
