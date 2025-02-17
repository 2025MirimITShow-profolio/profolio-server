import { Module } from '@nestjs/common';
import { DailyTasksService } from './daily_tasks.service';
import { DailyTasksController } from './daily_tasks.controller';

@Module({
  controllers: [DailyTasksController],
  providers: [DailyTasksService],
})
export class DailyTasksModule {}
