import { Controller, Get, UseGuards } from '@nestjs/common';
import { DailyTasksService } from './daily_tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/daily-tasks')
export class DailyTasksController {
  constructor(private readonly dailyTasksService: DailyTasksService) {}

  @Get()
  async findAll(@AuthUser('id') id: number) {
    return this.dailyTasksService.findAll(id);
  }
}
