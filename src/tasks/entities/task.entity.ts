import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from '../task-status.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  @Exclude({ toPlainOnly: true })
  user: User;
}
