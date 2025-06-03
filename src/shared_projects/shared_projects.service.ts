import {
  BadRequestException,
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
import { Project } from 'src/projects/entity/projects.entity';

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
  ): Promise<SharedProject> {
    try {
      const project_id = createSharedProjectDto.project_id;
      const user = await this.userService.findUser(user_id);

      const project =
        await this.projectsService.findProjectByProjectID(project_id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      if (project.user_id !== user_id) {
        throw new BadRequestException('Project is not owned by the user');
      }

      const existingProject = await this.sharedProjectRepository.findOne({
        where: { user_id, project_id },
      });
      if (existingProject) {
        throw new ConflictException('Project already shared');
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
        err instanceof ConflictException ||
        BadRequestException
      ) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to share project');
    }
  }

  async findSharedProjectsByUserId(user_id): Promise<Project[]> {
    const user = await this.userService.findUser(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sharedProeject = await this.sharedProjectRepository.find({
      where: { user_id },
      relations: ['project'],
    });
    const sharedProejects = sharedProeject.map((project) => project.project);

    return sharedProejects;
  }

  async stopSharingProject(user_id: number, project_id: number) {
    try {
      const sharedProject = await this.sharedProjectRepository.findOneBy({
        user_id,
        project_id,
      });

      if (!sharedProject) {
        throw new NotFoundException('Shared project not found');
      }
      const sharedProjectId = sharedProject.id;

      return await this.sharedProjectRepository.delete(sharedProjectId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to delete shared project');
    }
  }
}
