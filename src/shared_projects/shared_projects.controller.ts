import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SharedProjectsService } from './shared_projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { CreateSharedProjectDto } from './dto/create-shraed_project.dto';

@Controller('api/shared-projects')
export class SharedProjectsController {
  constructor(private readonly sharedProjectsService: SharedProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser('id') id: number,
    @Body() createSharedProjectDto: CreateSharedProjectDto,
  ) {
    return this.sharedProjectsService.create(id, createSharedProjectDto);
  }
}
