import { Module } from '@nestjs/common';
import { ProgressLogService } from './progress_log.service';
import { ProgressLogController } from './progress_log.controller';

@Module({
  controllers: [ProgressLogController],
  providers: [ProgressLogService],
})
export class ProgressLogModule {}
