import { Body, Req, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  getAllProjects(@AuthUser('id') userId){
    return this.projectsService.getAllProjects(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProject(@Param('id') id, @AuthUser('id') userId){
    return this.projectsService.getProject(userId, +id);
  }
  

}
