import { AiFeedback } from 'src/ai_feedbacks/ai_feedbacks.entity';
import { Progress_log } from 'src/progress_log/progress_log.entity';
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
  OneToOne,
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

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({nullable: true, default: false})
  is_shared: boolean;

  @Column({ nullable: true })
  links: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  team_members: string;

  @Column({ nullable: true })
  skills: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, (task) => task.project_id)
  tasks?: Task[];

  @OneToMany(() => SharedProject, (sharedProject) => sharedProject.project)
  sharedProjects?: SharedProject[];

  @OneToOne(() => AiFeedback, (aifeedbacks) => aifeedbacks.project)
  ai_feedbacks?: AiFeedback;

  @OneToMany(() => Progress_log, (progress_log) => progress_log.project)
  progress_log?: Progress_log[]
}
