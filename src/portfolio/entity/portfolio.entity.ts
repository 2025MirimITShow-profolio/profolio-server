import { Project } from "src/projects/entity/projects.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Portfolio{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  pdf_url: string;

  @CreateDateColumn()
  uploaded_at: Date;
}