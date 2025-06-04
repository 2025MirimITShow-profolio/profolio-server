import { DailyTask } from 'src/daily_tasks/entity/daily_tasks.entity';
import { SharedProject } from 'src/shared_projects/entity/shared_projects.entity';
import { Task } from 'src/tasks/entity/task.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profile_image?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  job: string;

  @Column()
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];

  @OneToMany(() => SharedProject, (sharedProjects) => sharedProjects.user)
  sharedProjects?: SharedProject[];

  @OneToMany(() => DailyTask, (dailyTasks) => dailyTasks.user)
  dailyTasks?: DailyTask[];
}
