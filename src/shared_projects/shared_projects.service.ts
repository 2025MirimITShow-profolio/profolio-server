import {
  Body,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedProject } from './entity/shared_projects.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateSharedProjectDto } from './dto/create-shraed_project.dto';

@Injectable()
export class SharedProjectsService {
  constructor(
    @InjectRepository(SharedProject)
    private readonly sharedProjectRepository: Repository<SharedProject>,
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  async create(
    user_id: number,
    createSharedProjectDto: CreateSharedProjectDto,
  ) {
    try {
      const project_id = createSharedProjectDto.project_id;
      const existingProject = await this.sharedProjectRepository.findOneBy({
        project_id,
      });
      if (existingProject) {
        throw new ConflictException('Project already shared');
      }

      const user = await this.userService.findUser(user_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const project =
        await this.projectsService.findProjectByProjectID(project_id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const sharedProject = {
        user,
        user_id,
        project,
        project_id,
      };

      return await this.sharedProjectRepository.save(sharedProject);
    } catch (err) {
      console.log(err);
      if (
        err instanceof NotFoundException ||
        err instanceof ConflictException
      ) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to share project');
    }
  }
}
