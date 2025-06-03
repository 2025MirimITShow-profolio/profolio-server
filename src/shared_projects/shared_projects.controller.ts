import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SharedProjectsService } from './shared_projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { CreateSharedProjectDto } from './dto/create-shraed_project.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/shared-projects')
export class SharedProjectsController {
  constructor(private readonly sharedProjectsService: SharedProjectsService) {}

  @Post()
  async create(
    @AuthUser('id') id: number,
    @Body() createSharedProjectDto: CreateSharedProjectDto,
  ) {
    return this.sharedProjectsService.create(id, createSharedProjectDto);
  }

  @Get()
  async findSharedProjects(@AuthUser('id') id: number) {
    return this.sharedProjectsService.findSharedProjectsByUserId(id);
  }

  @Get(':user_id')
  async findOtherSharedProjects(@Param('user_id') user_id: number) {
    return this.sharedProjectsService.findSharedProjectsByUserId(user_id);
  }
}
