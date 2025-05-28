import { Injectable } from '@nestjs/common';
import { Project } from './entity/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/users/entity/user.entity';
import { ProjectTimelineDto } from './dto/project-timeline.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const newProject = this.projectRepository.create({
      ...createProjectDto,
      start_date: new Date(createProjectDto.start_date),
      end_date: new Date(createProjectDto.end_date),
      user: user,
    });

    console.log(newProject);

    return this.projectRepository.save(newProject);
  }

  async findProjectByProjectID(id): Promise<Project | null> {
    return await this.projectRepository.findOneBy({ id });
  }

  async getAllProjects(userId: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { user: { id: userId } } });
  }
  
  async getTimeline(
    userId: number
  ): Promise<ProjectTimelineDto[]> {
    return await this.projectRepository.find({select:['id', 'title', 'start_date', 'end_date'], where: {user:{id:userId}}});
  }

  async getCounts(
    userId: number
  ): Promise<{ in_progress: number; completed: number }>{
    const today = new Date();

    const inProgressCnt = await this.projectRepository.count({
      where: {user: {id: userId}, end_date: MoreThan(today)}
    });

    const completedCnt = await this.projectRepository.count({
      where: {user: {id: userId}, end_date: LessThanOrEqual(today)}
    });

    return {
      in_progress: inProgressCnt,
      completed: completedCnt
    };
  }

  async getTitles(
    userId: number
  ): Promise<{ id: number, title: string }[]>{
    return await this.projectRepository.find({
      select: ['id', 'title'], where: {user:{id:userId}}
    });
  }

  async getProject(projectId: number, userId: number): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });
  }

  async updateProject(
    projectId: number,
    userId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });

    const newProject = {
      ...project,
      ...updateProjectDto,
    };

    newProject.id = project.id;

    return this.projectRepository.save(newProject);
  }

  async deleteProject(
    projectId: number,
    userId: number
  ){
    await this.projectRepository.delete({id: projectId, user: {id: userId}});
  }
}
