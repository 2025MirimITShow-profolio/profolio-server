import { Body, Req, Controller, Get, Post, UseGuards, Param, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entity/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto'; 
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createProject(@Body() dto: CreateProjectDto, @Req() req):Promise<Project>{
    const user = req.user;
    return this.projectsService.createProject(dto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProjects(@AuthUser('id') userId):Promise<Project[]>{
    return this.projectsService.getAllProjects(userId);
  }

  @Get(':project_id')
  @UseGuards(JwtAuthGuard)
  async getProject(@Param('project_id') project_id, @AuthUser('id') userId):Promise<Project>{
    return this.projectsService.getProject(+project_id, userId);
  }

  @Patch(':project_id')
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Param('project_id') project_id,
    @AuthUser('id') userId,
    @Body() updateProjectDto: UpdateProjectDto):Promise<Project>{
    return this.projectsService.updateProject(+project_id, userId, updateProjectDto);
  }
  

}
