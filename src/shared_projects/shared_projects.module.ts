import { Module } from '@nestjs/common';
import { SharedProjectsService } from './shared_projects.service';
import { SharedProjectsController } from './shared_projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedProject } from './entity/shared_projects.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedProject]),
    ProjectsModule,
    UsersModule,
  ],
  controllers: [SharedProjectsController],
  providers: [SharedProjectsService],
})
export class SharedProjectsModule {}
