import { Module } from '@nestjs/common';
import { ProgressLogService } from './progress_log.service';
import { ProgressLogController } from './progress_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress_log } from './progress_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress_log])],
  controllers: [ProgressLogController],
  providers: [ProgressLogService],
})
export class ProgressLogModule {}