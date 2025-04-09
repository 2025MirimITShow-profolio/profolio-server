import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
  ): Promise<Object> {
    try {
      const task = { createTaskDto, project_id };

      await this.taskRepository.save(task);

      return {
        status: HttpStatus.CREATED,
        message: 'Task created successfully',
        data: task,
      };
    } catch (err) {
      throw new InternalServerErrorException('Failed to create Task : ', err);
    }
  }
}
