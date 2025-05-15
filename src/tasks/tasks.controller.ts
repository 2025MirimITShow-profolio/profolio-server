import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// TODO : 가드 추가
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
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

  @Patch(':task_id')
  async updateTask(
    @Param('task_id') task_id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(task_id, updateTaskDto);
  }

  @Patch(':task_id/status')
  async updateTaskDone(@Param('task_id') task_id: number) {
    return this.tasksService.updateTaskStatus(task_id);
  }

  @Delete(':task_id')
  async deleteTask(@Param('task_id') task_id: number) {
    return this.tasksService.deleteTask(task_id);
  }
}
