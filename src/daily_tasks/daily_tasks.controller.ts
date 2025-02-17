import { Controller } from '@nestjs/common';
import { DailyTasksService } from './daily_tasks.service';

@Controller('daily-tasks')
export class DailyTasksController {
  constructor(private readonly dailyTasksService: DailyTasksService) {}
}
