import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(
    project_id: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    try {
      const task = { createTaskDto, project_id };

      return await this.taskRepository.save(task);
    } catch (err) {
      throw new InternalServerErrorException('Failed to create Task : ', err);
    }
  }

  async findAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();

      if (!tasks) {
        throw new NotFoundException('Tasks not found');
      }

      return tasks;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve tasks : ',
        err,
      );
    }
  }

  async findOneTask(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneBy({ id });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to retrieve task : ', err);
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.taskRepository.findOneBy({ id });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return await this.taskRepository.remove(task);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to retrieve task : ', err);
    }
  }
}
