import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillsModule } from './skills/skills.module';
import { AiFeedbacksModule } from './ai_feedbacks/ai_feedbacks.module';
import { SharedProjectsModule } from './shared_projects/shared_projects.module';
import { DailyTasksModule } from './daily_tasks/daily_tasks.module';
import { TasksModule } from './tasks/tasks.module';
import { ProgressLogModule } from './progress_log/progress_log.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    PortfolioModule,
    ProgressLogModule,
    TasksModule,
    DailyTasksModule,
    SharedProjectsModule,
    SharedProjectsModule,
    AiFeedbacksModule, 
    SkillsModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.local.env'}),
    MongooseModule.forRoot(process.env.MongoDB_URI as string),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}