import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    try {
      const project = await this.projectService.findProjectByProjectID(
        createTaskDto.project_id,
      );

      const task = { ...createTaskDto, project, user };

      return await this.taskRepository.save(task);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to create Task : ', err);
    }
  }

  async findAllTasks(user_id: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user_id } });
  }

  async findOneTask(user_id: number, id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { user_id, id } });
  }

  async findAllTasksByProject(
    user_id: number,
    project_id: number,
  ): Promise<Task[] | null> {
    try {
      const project =
        await this.projectService.findProjectByProjectID(project_id);
      if (!project) {
        throw new NotFoundException('Project not found.');
      }

      return await this.taskRepository.find({ where: { user_id, project_id } });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to retrieve task : ', err);
    }
  }

  async updateTask(
    user_id: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { user_id, id },
      });
      if (!task) {
        throw new NotFoundException('Task not found.');
      }
      await this.taskRepository.save(updateTaskDto);

      return await this.taskRepository.findOneBy({ id });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to update task : ', err);
    }
  }

  async updateTaskStatus(user_id: number, id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { user_id, id },
      });
      if (!task) {
        throw new NotFoundException('Task not found.');
      }

      task.is_done = !task.is_done;
      return await this.taskRepository.save(task);
    } catch (err) {}
  }

  async deleteTask(user_id: number, id: number) {
    try {
      const tasks = await this.taskRepository.findOne({
        where: { user_id, id },
      });
      if (!tasks) {
        throw new NotFoundException('Task not found');
      }

      return await this.taskRepository.delete(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
