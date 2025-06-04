import { Module } from '@nestjs/common';
import { DailyTasksService } from './daily_tasks.service';
import { DailyTasksController } from './daily_tasks.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTask } from './entity/daily_tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyTask]), UsersModule],
  controllers: [DailyTasksController],
  providers: [DailyTasksService],
  exports: [DailyTasksService],
})
export class DailyTasksModule {}
