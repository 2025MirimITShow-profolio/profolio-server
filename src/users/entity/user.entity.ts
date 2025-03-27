import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  profile_image?: string;

  @Column({unique: true})
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

}