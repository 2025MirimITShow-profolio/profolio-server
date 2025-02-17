import { Test, TestingModule } from '@nestjs/testing';
import { DailyTasksController } from './daily_tasks.controller';
import { DailyTasksService } from './daily_tasks.service';

describe('DailyTasksController', () => {
  let controller: DailyTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyTasksController],
      providers: [DailyTasksService],
    }).compile();

    controller = module.get<DailyTasksController>(DailyTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
