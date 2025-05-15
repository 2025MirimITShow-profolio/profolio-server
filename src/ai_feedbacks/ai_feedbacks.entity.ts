import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface AiMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

@Entity('ai_feedbacks')
export class AiFeedback {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, name: 'project_id' })
  projectId: string;

  @Column({ type: 'json', nullable: true })
  messages: AiMessage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
