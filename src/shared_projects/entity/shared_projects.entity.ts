import { Project } from 'src/projects/entity/projects.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'shared_projects' })
export class SharedProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sharedProjects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @ManyToOne(() => Project, (project) => project.sharedProjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project' })
  project: Project;

  @Column({ name: 'project_id', nullable: false })
  project_id: number;

  @CreateDateColumn()
  shared_at: Date;
}
