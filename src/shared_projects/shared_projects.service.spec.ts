import { Test, TestingModule } from '@nestjs/testing';
import { SharedProjectsService } from './shared_projects.service';

describe('SharedProjectsService', () => {
  let service: SharedProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedProjectsService],
    }).compile();

    service = module.get<SharedProjectsService>(SharedProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
