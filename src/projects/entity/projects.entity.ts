import { SharedProject } from 'src/shared_projects/entity/shared_projects.entity';
import { Task } from 'src/tasks/entity/task.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ nullable: true })
  links: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  team_members: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, (task) => task.project_id)
  tasks?: Task[];

  @OneToMany(() => SharedProject, (sharedProject) => sharedProject.project)
  sharedProjects?: SharedProject[];
}
