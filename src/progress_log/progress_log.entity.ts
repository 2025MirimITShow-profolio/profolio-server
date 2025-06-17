import { Project } from 'src/projects/entity/projects.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('progress_log')
export class Progress_log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.progress_log, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project' })
  project?: Project;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  links: string[];

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}