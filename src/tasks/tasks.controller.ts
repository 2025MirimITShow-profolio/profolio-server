import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Task } from './entity/task.entity';
import { AuthUser } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req,
  ): Promise<Task> {
    const user = req.user;
    return this.tasksService.create(createTaskDto, user);
  }

  @Get('counts')
  async taskCounts(@AuthUser('id') id: number) {
    return this.tasksService.taskCounts(id);
  }
  
  @Get('all')
  async findAllTasks(@AuthUser('id') id: number) {
    return this.tasksService.findAllTasks(id);
  }

  @Get(':task_id')
  async findOneTask(
    @AuthUser('id') id: number,
    @Param('task_id') task_id: number,
  ) {
    return this.tasksService.findOneTask(id, task_id);
  }

  @Patch(':task_id/status')
  async updateTaskDone(
    @AuthUser('id') id: number,
    @Param('task_id') task_id: number,
  ) {
    console.log('updateTaskDone');
    return this.tasksService.updateTaskStatus(id, task_id);
  }

  @Patch(':task_id')
  async updateTask(
    @AuthUser('id') id: number,
    @Param('task_id') task_id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, task_id, updateTaskDto);
  }

  @Delete(':task_id')
  async deleteTask(
    @AuthUser('id') id: number,
    @Param('task_id') task_id: number,
  ) {
    return this.tasksService.deleteTask(id, task_id);
  }

  @Get('project/:project_id')
  async findAllTasksByProject(
    @AuthUser('id') id: number,
    @Param('project_id') project_id: number,
  ) {
    return this.tasksService.findAllTasksByProject(id, project_id);
  }

  @Get()
  async findTaskByDate(
    @AuthUser('id') id: number,
    @Query('date') date: string,
  ) {
    return this.tasksService.findTaskByDate(id, date);
  }

}
