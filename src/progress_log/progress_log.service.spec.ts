import { Test, TestingModule } from '@nestjs/testing';
import { ProgressLogService } from './progress_log.service';

describe('ProgressLogService', () => {
  let service: ProgressLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressLogService],
    }).compile();

    service = module.get<ProgressLogService>(ProgressLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
