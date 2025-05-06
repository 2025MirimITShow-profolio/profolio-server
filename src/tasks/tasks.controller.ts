import { Controller, Param, Post, Get } from '@nestjs/common';
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

  @Get()
  async findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  @Get(':task_id')
  async findOneTask(@Param('task_id') task_id: number) {
    return this.tasksService.findOneTask(task_id);
  }
}
