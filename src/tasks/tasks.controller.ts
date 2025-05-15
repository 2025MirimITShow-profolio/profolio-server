import { Controller, Param, Post, Get, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

// TODO : 가드 추가
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  @Get(':project_id')
  async findAllTasksByProject(@Param('project_id') project_id: number) {
    return this.tasksService.findAllTasksByProject(project_id);
  }

  @Delete(':task_id')
  async deleteTask(@Param('task_id') task_id: number) {
    return this.tasksService.deleteTask(task_id);
  }
}
