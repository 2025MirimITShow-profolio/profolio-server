import { Injectable } from '@nestjs/common';
import { Project } from './entity/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {

    const newProject = this.projectRepository.create({
      ...createProjectDto,
      start_date: new Date(createProjectDto.start_date),
      end_date: new Date(createProjectDto.end_date),
      user: user
    });

    console.log(newProject);

    return this.projectRepository.save(newProject);
  }

  async getAllProjects(userId:number):Promise<Project[]>{
    return this.projectRepository.find({where: {user: {id: userId}}});
  }

  async getProject(userId:number, projectId: number):Promise<Project>{
    return this.projectRepository.findOne({where:{id: projectId, user: {id: userId}}})
  }

}
