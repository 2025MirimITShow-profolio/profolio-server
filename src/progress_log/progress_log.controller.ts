import { Controller } from '@nestjs/common';
import { ProgressLogService } from './progress_log.service';

@Controller('progress-log')
export class ProgressLogController {
  constructor(private readonly progressLogService: ProgressLogService) {}
}
