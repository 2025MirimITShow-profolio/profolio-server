import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { Project } from 'src/projects/entity/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService],
})
export class TasksModule {}
