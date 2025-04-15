import { Body, Req, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createProject(@Body() dto: CreateProjectDto, @Req() req){
    const user = req.user;
    return this.projectsService.createProject(dto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllProjects(@Req() req){
    const user = req.user;
    return this.projectsService.getAllProjects(user);
  }
  

}
