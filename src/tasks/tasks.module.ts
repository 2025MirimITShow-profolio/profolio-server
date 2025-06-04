import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Project } from 'src/projects/entity/projects.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { DailyTasksModule } from 'src/daily_tasks/daily_tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    ProjectsModule,
    DailyTasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
