import { Project } from 'src/projects/entity/projects.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

export interface AiMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

@Entity('ai_feedbacks')
export class AiFeedback {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => Project, (project) => project.ai_feedbacks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project' })
  project?: Project;

  @Column({ type: 'uuid', nullable: false, name: 'project_id' })
  projectId: string;

  @Column({ type: 'json', nullable: true })
  messages: AiMessage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
