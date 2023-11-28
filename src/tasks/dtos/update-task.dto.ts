import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
