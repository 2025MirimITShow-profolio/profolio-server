import { Controller } from '@nestjs/common';
import { SharedProjectsService } from './shared_projects.service';

@Controller('shared-projects')
export class SharedProjectsController {
  constructor(private readonly sharedProjectsService: SharedProjectsService) {}
}
