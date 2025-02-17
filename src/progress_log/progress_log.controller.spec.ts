import { Test, TestingModule } from '@nestjs/testing';
import { ProgressLogController } from './progress_log.controller';
import { ProgressLogService } from './progress_log.service';

describe('ProgressLogController', () => {
  let controller: ProgressLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressLogController],
      providers: [ProgressLogService],
    }).compile();

    controller = module.get<ProgressLogController>(ProgressLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
