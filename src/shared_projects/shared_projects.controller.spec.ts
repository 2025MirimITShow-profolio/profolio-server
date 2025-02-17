import { Test, TestingModule } from '@nestjs/testing';
import { SharedProjectsController } from './shared_projects.controller';
import { SharedProjectsService } from './shared_projects.service';

describe('SharedProjectsController', () => {
  let controller: SharedProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedProjectsController],
      providers: [SharedProjectsService],
    }).compile();

    controller = module.get<SharedProjectsController>(SharedProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
