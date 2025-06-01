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
}
