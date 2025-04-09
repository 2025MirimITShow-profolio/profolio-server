import { Controller, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

// TODO : 가드 추가
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/:project_id')
  async create(
    @Param('project_id') project_id: number,
    createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(project_id, createTaskDto);
  }
}
