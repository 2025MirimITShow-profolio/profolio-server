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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const project = await this.projectService.findProjectByProjectID(
        createTaskDto.proejct_id,
      );
      if (!project) {
        throw new NotFoundException('Project not found.');
      }

      const task = { ...createTaskDto, project };

      return await this.taskRepository.save(task);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
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
}
