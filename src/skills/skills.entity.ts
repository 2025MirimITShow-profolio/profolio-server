import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @OneToOne
    @Column({nullable: false})
    user_id: string;

    // @OneToMany
    @Column({type: 'json', nullable: false})
    project_id: string[];

    @Column({nullable: false})
    name: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}