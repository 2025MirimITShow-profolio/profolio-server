import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'daily_tasks' })
export class DailyTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dailyTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @Column({ name: 'date', nullable: false })
  date: string;

  @Column({ name: 'task_count', default: 0 })
  task_count: number;

  @CreateDateColumn()
  created_at: number;
}
