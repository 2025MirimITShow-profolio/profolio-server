import { Module } from '@nestjs/common';
import { SharedProjectsService } from './shared_projects.service';
import { SharedProjectsController } from './shared_projects.controller';

@Module({
  controllers: [SharedProjectsController],
  providers: [SharedProjectsService],
})
export class SharedProjectsModule {}
